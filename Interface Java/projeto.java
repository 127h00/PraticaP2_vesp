import java.awt.*;
import java.awt.event.*;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import javax.swing.text.JTextComponent;

public class projeto {

    private static final String JDBC_DRIVER = "com.microsoft.sqlserver.jdbc.SQLServerDriver";
    private static final String DB_URL = "jdbc:sqlserver://REGULUS:1433;databaseName=BD23306;trustServerCertificate=true";
    private static final String USER = "BD23306";
    private static final String PASS = "BD23306";

    private Connection conn;
    private JFrame frame;
    private JTextField userField;
    private JPasswordField passField;
    private JButton btnLogin;
    private JTable table;
    private DefaultTableModel tableModel;
    private JTextComponent descricaoField;
    private JTextComponent precoField;
    private JTextComponent estoqueField;
    private JTextComponent nome_produtoField;
    
    public static void main(String[] args) {
        EventQueue.invokeLater(() -> {
            try {
                projeto window = new projeto();
                window.frame.setVisible(true);
            } catch (Exception e) {
                e.printStackTrace();
            }
        });
    }

    public projeto() {
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

        JPanel produtoPanel = createProdutoPanel();
        frame.getContentPane().add(produtoPanel, BorderLayout.CENTER);
        produtoPanel.setVisible(false);
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

    private JPanel createProdutoPanel() {
        JPanel produtoPanel = new JPanel(new BorderLayout());

        // Tabela para mostrar as consultas
        tableModel = new DefaultTableModel();
        tableModel.addColumn("ID produto");
        tableModel.addColumn("Nome do produto");
        tableModel.addColumn("Estoque");
        tableModel.addColumn("Preço");
        tableModel.addColumn("Descrição");

        table = new JTable(tableModel);
        JScrollPane scrollPane = new JScrollPane(table);
        produtoPanel.add(scrollPane, BorderLayout.CENTER);

        // Botões para adicionar, alterar e cancelar produtos
        JPanel buttonPanel = new JPanel();
        JButton btnAdicionarProduto = new JButton("Adicionar produto");
        btnAdicionarProduto.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                abrirInserirProduto();
            }
        });

        JButton btnAlterarProduto = new JButton("Alterar produto");
        btnAlterarProduto.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                abrirAlterarProduto();
            }
        });

        JButton btnCancelarProduto = new JButton("Cancelar produto");
        btnCancelarProduto.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                cancelarProduto();
            }
        });

        buttonPanel.add(btnAdicionarProduto);
        buttonPanel.add(btnAlterarProduto);
        buttonPanel.add(btnCancelarProduto);
        produtoPanel.add(buttonPanel, BorderLayout.SOUTH);

        return produtoPanel;
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
            mostrarProduto();
        } else {
            JOptionPane.showMessageDialog(frame, "Login falhou. Verifique suas credenciais.");
        }
    }

    private boolean verificarLogin(String user, String pass) {
        String query = "SELECT * FROM loja.produto WHERE User = ?";

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

    private void mostrarProduto() {
        frame.getContentPane().getComponent(0).setVisible(false); // Oculta o painel de login
        frame.getContentPane().getComponent(1).setVisible(true); // Exibe o painel de consultas

        // Carregar consultas do banco de dados
        List<Produto> produtos = obterProdutoDoBanco();

        // Limpar tabela
        tableModel.setRowCount(0);

        // Adicionar consultas à tabela
        for (Produto produto : produtos) {
            tableModel.addRow(produto.toArray());
        }
    }

    private List<Produto> obterProdutoDoBanco() {
        List<Produto> produtos = new ArrayList<>();

        String sql = "SELECT id_produto, nome_produto, estoque, preco, descricao FROM loja.produto";

        try (PreparedStatement preparedStatement = conn.prepareStatement(sql)) {
            ResultSet resultSet = preparedStatement.executeQuery();

            while (resultSet.next()) {
                String id_produto = resultSet.getString("id_produto");
                String nome_produto = resultSet.getString("nome_produto");
                int estoque = resultSet.getInt("estoque");
                String preco = resultSet.getString("preco");
                String descricao = resultSet.getString("descricao");

                Produto produto = new Produto(id_produto, nome_produto, estoque, preco, descricao);
                produtos.add(produto);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return produtos;
    }

    private void abrirInserirProduto() {
        // Interface para adicionar consulta
        JFrame inserirFrame = new JFrame("Adicionar produto");
        inserirFrame.setBounds(100, 100, 400, 300);
        inserirFrame.setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
        inserirFrame.getContentPane().setLayout(new BorderLayout());

        JTextField id_pedidoField = new JTextField();
        JTextField nome_produtoField = new JTextField();
        JTextField estoqueField = new JTextField();
        JTextField precoField = new JTextField();
        JTextField descricaoField = new JTextField();

        JButton btnSalvarProduto = new JButton("Salvar produto");
        btnSalvarProduto.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                adicionarProduto(
                        id_pedidoField.getText(),
                        nome_produtoField.getText(),
                        estoqueField.getText(),
                        precoField.getText(),
                        descricaoField.getText()
                );
                inserirFrame.dispose();
            }
        });

        JButton btnVoltar = new JButton("Voltar");
        btnVoltar.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                inserirFrame.dispose();
            }
        });

        JPanel formPanel = new JPanel(new GridLayout(7, 2, 5, 5));
        formPanel.add(new JLabel("ID produto:"));
        formPanel.add(id_pedidoField);
        formPanel.add(new JLabel("Nome do produto:"));
        formPanel.add(nome_produtoField);
        formPanel.add(new JLabel("Estoque:"));
        formPanel.add(estoqueField);
        formPanel.add(new JLabel("Preço:"));
        formPanel.add(precoField);
        formPanel.add(new JLabel("Descrição:"));
        formPanel.add(descricaoField);

        JPanel buttonPanel = new JPanel();
        buttonPanel.add(btnSalvarProduto);
        buttonPanel.add(btnVoltar);

        inserirFrame.add(formPanel, BorderLayout.CENTER);
        inserirFrame.add(buttonPanel, BorderLayout.SOUTH);

        inserirFrame.setVisible(true);
    }

    private void abrirAlterarProduto() {
        // Interface para alterar consulta
        JFrame alterarFrame = new JFrame("Alterar produto");
        alterarFrame.setBounds(100, 100, 400, 300);
        alterarFrame.setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
        alterarFrame.getContentPane().setLayout(new BorderLayout());

        JTextField id_produtoField = new JTextField();
        JTextField nome_produtoField = new JTextField();
        JTextField estoqueField = new JTextField();
        JTextField precoField = new JTextField();
        JTextField descricaoField = new JTextField();

        JButton btnBuscarProduto = new JButton("Buscar produto");
        btnBuscarProduto.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                buscarProduto(id_produtoField.getText());
            }
        });

        JButton btnAlterarProduto = new JButton("Alterar produto");
        btnAlterarProduto.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                alterarProduto(
                        id_produtoField.getText(),
                        nome_produtoField.getText(),
                        estoqueField.getText(),
                        precoField.getText(),
                        descricaoField.getText()
                );
                alterarFrame.dispose();
            }
        });

        JButton btnVoltar = new JButton("Voltar");
        btnVoltar.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                alterarFrame.dispose();
            }
        });

        JPanel formPanel = new JPanel(new GridLayout(8, 2, 5, 5));
        formPanel.add(new JLabel("ID produto:"));
        formPanel.add(id_produtoField);
        formPanel.add(new JLabel("Nome produto:"));
        formPanel.add(nome_produtoField);
        formPanel.add(new JLabel("Estoque:"));
        formPanel.add(estoqueField);
        formPanel.add(new JLabel("Preço:"));
        formPanel.add(precoField);
        formPanel.add(new JLabel("Descrição:"));
        formPanel.add(descricaoField);

        JPanel buttonPanel = new JPanel();
        buttonPanel.add(btnBuscarProduto);
        buttonPanel.add(btnAlterarProduto);
        buttonPanel.add(btnVoltar);

        alterarFrame.add(formPanel, BorderLayout.CENTER);
        alterarFrame.add(buttonPanel, BorderLayout.SOUTH);

        alterarFrame.setVisible(true);
    }


    private void buscarProduto(String id_produto) {
        if (produtoExiste(id_produto)) {
            String sql = "SELECT * FROM loja.produto WHERE id_produto = ?";
            try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
                pstmt.setString(1, id_produto);
                ResultSet resultSet = pstmt.executeQuery();

                if (resultSet.next()) {
                    String nome_produto = resultSet.getString("nome_produto");
                    int estoque = resultSet.getInt("estoque");
                    String preco = resultSet.getString("preco");
                    String descricao = resultSet.getString("descricao");

                    // Preencher os campos da interface com os dados da consulta
                    // Aqui, você deve ter campos correspondentes na interface gráfica (JTextField, etc.)
                    nome_produtoField.setText(nome_produto);
                    estoqueField.setText(String.valueOf(estoque));
                    precoField.setText(preco);
                    descricaoField.setText(descricao);
                }
            } catch (SQLException e) {
                e.printStackTrace();
                JOptionPane.showMessageDialog(frame, "Erro ao buscar produto. Verifique o console para mais detalhes.");
            }
        } else {
            JOptionPane.showMessageDialog(frame, "Produto não encontrado.");
        }
    }

    private void alterarProduto(String id_produto, String nome_produto, String estoque, String preco, String descricao) {
        if (produtoExiste(id_produto)) {
            String sql = "UPDATE loja.produto SET nome_produto = ?, estoque = ?, preco = ?, descricao = ? WHERE id_produto = ?";
            try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
                pstmt.setString(1, nome_produto);
                pstmt.setInt(2, Integer.parseInt(estoque));
                pstmt.setString(3, preco);
                pstmt.setString(4, descricao);
                pstmt.setString(5, id_produto);

                pstmt.executeUpdate();

                // Atualizar a tabela com as consultas após a alteração
                mostrarProduto();

                JOptionPane.showMessageDialog(frame, "Produto alterado com sucesso.");
            } catch (Exception e) {
                e.printStackTrace();
                JOptionPane.showMessageDialog(frame, "Erro ao alterar o produto. Verifique o console para mais detalhes.");
            }
        } else {
            JOptionPane.showMessageDialog(frame, "Produto não encontrado.");
        }
    }

    private void adicionarProduto(String id_produto, String nome_produto, String estoque, String preco, String descricao) {
        // Implemente a lógica para adicionar uma nova consulta no banco de dados
        // Exemplo: Inserir os dados no banco usando uma instrução SQL INSERT

        String sql = "INSERT INTO loja.produto (id_produto, nome_produto, estoque, preco, descricao) VALUES (?, ?, ?, ?, ?)";
        try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, id_produto);
            pstmt.setString(2, nome_produto);
            pstmt.setInt(3, Integer.parseInt(estoque));
            pstmt.setString(4, preco);
            pstmt.setString(5, descricao);

            pstmt.executeUpdate();

            // Atualizar a tabela com as consultas após a adição
            mostrarProduto();

            JOptionPane.showMessageDialog(frame, "Produto adicionado com sucesso.");
        } catch (Exception e) {
            e.printStackTrace();
            JOptionPane.showMessageDialog(frame, "Erro ao adicionar o produto. Verifique o console para mais detalhes.");
        }
    }

    private void cancelarProduto() {
        // Implemente a lógica para cancelar uma consulta, se necessário
        // Exemplo: Remover a consulta do banco de dados
    }

    private boolean produtoExiste(String id_produto) {
        try {
            String sql = "SELECT 1 FROM loja.produto WHERE id_produto = ?";
            PreparedStatement pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, id_produto);

            ResultSet rs = pstmt.executeQuery();

            return rs.next();
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return false;
    }

    // O restante do seu código...

    public static class Produto {
        private String id_produto;
        private String nome_produto;
        private int estoque;
        private String preco;
        private String descricao;

        public Produto(String id_produto, String nome_produto, int estoque, String preco, String descricao) {
            this.id_produto = id_produto;
            this.nome_produto = nome_produto;
            this.estoque = estoque;
            this.preco = preco;
            this.descricao = descricao;
        }

        public Object[] toArray() {
            return new Object[]{id_produto, nome_produto, estoque, preco, descricao};
        }
    }
}