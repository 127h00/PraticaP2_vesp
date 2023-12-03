import java.awt.*;
import java.awt.event.*;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import javax.swing.text.JTextComponent;

public class Loja {

    private static final String JDBC_DRIVER = "com.microsoft.sqlserver.jdbc.SQLServerDriver";
    private static final String DB_URL = "jdbc:sqlserver://regulus.cotuca.unicamp.br:1433;databaseName=BD23306;trustServerCertificate=true";
    private static final String USER = "BD23306";
    private static final String PASS = "BD23306";

    private Connection conn;
    private JFrame frame;
    private JTextField userField;
    private JPasswordField passField;
    private JButton btnLogin;
    private JTable table;
    private DefaultTableModel tableModel;
    private JTextField id_pedidoField = new JTextField();
    private JTextField cpf_cField = new JTextField();
    private JTextField produtoField = new JTextField();
    private JTextField quantidadeField = new JTextField();
    private JTextField tamanhoField = new JTextField();
    private JTextField situacaoField = new JTextField();

    public static void main(String[] args) {
        EventQueue.invokeLater(() -> {
            try {
                Loja window = new Loja();
                window.frame.setVisible(true);
            } catch (Exception e) {
                e.printStackTrace();
            }
        });
    }

    public Loja() {
        initialize();
        connectToDatabase();
    }

    private void initialize() {
        frame = new JFrame();
        frame.setBounds(100, 100, 800, 600);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.getContentPane().setLayout(new BorderLayout());

        JPanel loginPanel = createLoginPanel();
        frame.getContentPane().add(loginPanel, BorderLayout.NORTH);

        JPanel pedidoPanel = createPedidoPanel();
        frame.getContentPane().add(pedidoPanel, BorderLayout.CENTER);
        pedidoPanel.setVisible(false);
    }

    private JPanel createLoginPanel() {
        JPanel loginPanel = new JPanel();
        loginPanel.setLayout(new FlowLayout());

        JLabel lblUser = new JLabel("User:");
        loginPanel.add(lblUser);

        userField = new JTextField(15);
        loginPanel.add(userField);

        JLabel lblPass = new JLabel("Password:");
        loginPanel.add(lblPass);

        passField = new JPasswordField(15);
        loginPanel.add(passField);

        btnLogin = new JButton("Login");
        btnLogin.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                fazerLogin();
            }
        });
        loginPanel.add(btnLogin);

        return loginPanel;
    }

    private JPanel createPedidoPanel() {
        JPanel pedidoPanel = new JPanel(new BorderLayout());

        // Tabela para mostrar as consultas
        tableModel = new DefaultTableModel();
        tableModel.addColumn("ID pedido");
        tableModel.addColumn("CPF cliente");
        tableModel.addColumn("Produto");
        tableModel.addColumn("Quantidade");
        tableModel.addColumn("Tamanho");
        tableModel.addColumn("Situação");

        table = new JTable(tableModel);
        JScrollPane scrollPane = new JScrollPane(table);
        pedidoPanel.add(scrollPane, BorderLayout.CENTER);

        // Botões para adicionar, alterar e cancelar consultas
        JPanel buttonPanel = new JPanel();

        JButton btnAlterarPedido = new JButton("Alterar pedido");
        btnAlterarPedido.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                abrirAlterarPedido();
            }
        });

        buttonPanel.add(btnAlterarPedido);
        pedidoPanel.add(buttonPanel, BorderLayout.SOUTH);

        return pedidoPanel;
    }

    private void connectToDatabase() {
        try {
            conn = DriverManager.getConnection(DB_URL, USER, PASS);
            System.out.println("Conexão com o banco de dados estabelecida com sucesso.");
        } catch (SQLException e) {
            e.printStackTrace();
            JOptionPane.showMessageDialog(frame, "Erro ao conectar ao banco de dados. Verifique o console para mais detalhes: " + e.getMessage());
        }
    }

    private void fazerLogin() {
        // Utilizaremos as suas credenciais diretamente
        String user = USER;
        String pass = PASS;

        if (verificarLogin(user, pass)) {
            mostrarPedido();
        } else {
            JOptionPane.showMessageDialog(frame, "Login falhou. Verifique suas credenciais.");
        }
    }

    private boolean verificarLogin(String user, String pass) {
        String query = "SELECT * FROM loja.pedido WHERE User = ?";

        try (PreparedStatement preparedStatement = conn.prepareStatement(query)) {
            preparedStatement.setString(1, user);

            try (ResultSet resultSet = preparedStatement.executeQuery()) {
                return resultSet.next();
            }
        } catch (SQLException e) {
            e.printStackTrace();
            JOptionPane.showMessageDialog(frame, "Erro ao verificar login. Verifique suas credenciais.");
        }

        return false;
    }

    private void mostrarPedido() {
        frame.getContentPane().getComponent(0).setVisible(false); // Oculta o painel de login
        frame.getContentPane().getComponent(1).setVisible(true); // Exibe o painel de consultas

        // Carregar consultas do banco de dados
        List<Pedido> pedidos = obterPedidoDoBanco();
        System.err.println(pedidos);

        // Limpar tabela
        tableModel.setRowCount(0);

        // Adicionar consultas à tabela
        for (Pedido pedido : pedidos) {
            tableModel.addRow(pedido.toArray());
        }
    }

    private List<Pedido> obterPedidoDoBanco() {
        List<Pedido> pedidos = new ArrayList<>();

        String sql = "SELECT id_pedido, cpf_c, produto, quantidade, tamanho, situacao FROM loja.pedido";

        try (PreparedStatement preparedStatement = conn.prepareStatement(sql)) {
            ResultSet resultSet = preparedStatement.executeQuery();

            while (resultSet.next()) {
                int id_pedido = resultSet.getInt("id_pedido");
                String cpf_c = resultSet.getString("cpf_c");
                String produto = resultSet.getString("produto");
                int quantidade = resultSet.getInt("quantidade");
                String tamanho = resultSet.getString("tamanho");
                String situacao = resultSet.getString("situacao");

                Pedido pedido = new Pedido(id_pedido, cpf_c, produto, quantidade, tamanho, situacao);
                pedidos.add(pedido);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return pedidos;
    }

    private void abrirAlterarPedido() {
        // Interface para alterar consulta
        JFrame alterarFrame = new JFrame("Alterar pedido");
        alterarFrame.setBounds(100, 100, 400, 300);
        alterarFrame.setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
        alterarFrame.getContentPane().setLayout(new BorderLayout());

        JButton btnBuscarPedido = new JButton("Buscar pedido");

        JButton btnAlterarPedido = new JButton("Alterar pedido");

        JButton btnVoltar = new JButton("Voltar");

        JPanel formPanel = new JPanel(new GridLayout(8, 2, 5, 5));
        formPanel.add(new JLabel("ID pedido:"));
        formPanel.add(id_pedidoField);
        formPanel.add(new JLabel("CPF cliente:"));
        formPanel.add(cpf_cField);
        formPanel.add(new JLabel("Produto:"));
        formPanel.add(produtoField);
        formPanel.add(new JLabel("Quantidade:"));
        formPanel.add(quantidadeField);
        formPanel.add(new JLabel("Tamanho:"));
        formPanel.add(tamanhoField);
        formPanel.add(new JLabel("Situação:"));
        formPanel.add(situacaoField);

        JPanel buttonPanel = new JPanel();
        buttonPanel.add(btnBuscarPedido);
        buttonPanel.add(btnAlterarPedido);
        buttonPanel.add(btnVoltar);

        alterarFrame.add(formPanel, BorderLayout.CENTER);
        alterarFrame.add(buttonPanel, BorderLayout.SOUTH);

        btnBuscarPedido.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                buscarPedido(id_pedidoField.getText());
            }
        });

        btnAlterarPedido.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                alterarPedido(
                        id_pedidoField.getText(),
                        cpf_cField.getText(),
                        produtoField.getText(),
                        quantidadeField.getText(),
                        tamanhoField.getText(),
                        situacaoField.getText()
                );
                alterarFrame.dispose();
            }
        });

        btnVoltar.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                alterarFrame.dispose();
            }
        });

        alterarFrame.setVisible(true);
    }


    private void buscarPedido(String id_pedido) {
        if (pedidoExiste(id_pedido)) {
            String sql = "SELECT * FROM loja.pedido WHERE id_pedido = ?";
            try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
                pstmt.setInt(1, Integer.parseInt(id_pedido));
                ResultSet resultSet = pstmt.executeQuery();

                if (resultSet.next()) {
                    String cpf_c = resultSet.getString("cpf_c");
                    String produto = resultSet.getString("produto");
                    int quantidade = resultSet.getInt("quantidade");
                    String tamanho = resultSet.getString("tamanho");
                    String situacao = resultSet.getString("situacao");
                    // Preencher os campos da interface com os dados da consulta
                    // Aqui, você deve ter campos correspondentes na interface gráfica (JTextField, etc.)
                    cpf_cField.setText(cpf_c);
                    produtoField.setText(produto);
                    quantidadeField.setText(String.valueOf(quantidade));
                    tamanhoField.setText(tamanho);
                    situacaoField.setText(situacao);
                }
            } catch (SQLException e) {
                e.printStackTrace();
                JOptionPane.showMessageDialog(frame, "Erro ao buscar pedido. Verifique o console para mais detalhes.");
            }
        } else {
            JOptionPane.showMessageDialog(frame, "Pedido não encontrado.");
        }
    }

    private void alterarPedido(String id_pedido, String cpf_c, String produto, String quantidade, String tamanho, String situacao) {
        if (pedidoExiste(id_pedido)) {
            String sql = "UPDATE loja.pedido SET cpf_c = ?, produto = ?, quantidade = ?, tamanho = ?, situacao = ? WHERE id_pedido = ?";
            try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
                pstmt.setString(1, cpf_c);
                pstmt.setString(2, produto);
                pstmt.setInt(3, Integer.parseInt(quantidade));
                pstmt.setString(4, tamanho);
                pstmt.setString(5, situacao);
                pstmt.setInt(6, Integer.parseInt(id_pedido));

                pstmt.executeUpdate();

                // Atualizar a tabela com as consultas após a alteração
                mostrarPedido();

                JOptionPane.showMessageDialog(frame, "Pedido alterado com sucesso.");
                id_pedidoField.setText("");
                cpf_cField.setText("");
                produtoField.setText("");
                quantidadeField.setText("");
                tamanhoField.setText("");
                situacaoField.setText("");
            } catch (Exception e) {
                e.printStackTrace();
                JOptionPane.showMessageDialog(frame, "Erro ao alterar o pedido. Verifique o console para mais detalhes.");
            }
        } else {
            JOptionPane.showMessageDialog(frame, "Pedido não encontrado.");
        }
    }

    private void cancelarPedido() {
        // Implemente a lógica para cancelar uma consulta, se necessário
        // Exemplo: Remover a consulta do banco de dados
    }

    private boolean pedidoExiste(String id_pedido) {
        try {
            String sql = "SELECT 1 FROM loja.pedido WHERE id_pedido = ?";
            PreparedStatement pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, Integer.parseInt(id_pedido));

            ResultSet rs = pstmt.executeQuery();

            return rs.next();
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return false;
    }

    public static class Pedido {
        private int id_pedido;
        private String cpf_c;
        private String produto;
        private int quantidade;
        private String tamanho;
        private String situacao;

        public Pedido (int id_pedido, String cpf_c, String produto, int quantidade, String tamanho, String situacao) {
            this.id_pedido = id_pedido;
            this.cpf_c = cpf_c;
            this.produto = produto;
            this.quantidade = quantidade;
            this.tamanho = tamanho;
            this.situacao = situacao;
        }

        public Object[] toArray() {
            return new Object[]{id_pedido, cpf_c, produto, quantidade, tamanho, situacao};
        }
    }
}