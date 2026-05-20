import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.net.URLDecoder;

import java.sql.Connection;
import java.sql.PreparedStatement;

import com.sun.net.httpserver.HttpServer;

public class App {

    public static void main(String[] args) throws Exception {

        HttpServer server =
                HttpServer.create(
                        new InetSocketAddress(8080),
                        0
                );

        server.createContext("/cadastro", exchange -> {

            if ("POST".equals(exchange.getRequestMethod())) {

                String body =
                        new String(
                                exchange.getRequestBody().readAllBytes()
                        );

                String[] dados = body.split("&");

                String nome = "";
                String sobrenome = "";
                String data = "";
                String email = "";
                String senha = "";
                String confirmar = "";
                String telefone = "";

                for (String dado : dados) {

                    String[] partes = dado.split("=");

                    if (partes.length < 2) {
                        continue;
                    }

                    String chave = partes[0];

                    String valor =
                            URLDecoder.decode(
                                    partes[1],
                                    "UTF-8"
                            );

                    switch (chave) {

                        case "nome":
                            nome = valor;
                            break;

                        case "sobrenome":
                            sobrenome = valor;
                            break;

                        case "data-nasc":
                            data = valor;
                            break;

                        case "email":
                            email = valor;
                            break;

                        case "senha":
                            senha = valor;
                            break;

                        case "confirm-senha":
                            confirmar = valor;
                            break;

                        case "telefone":
                            telefone = valor;
                            break;
                    }
                }

                if (!senha.equals(confirmar)) {

                    String resposta =
                            "As senhas não coincidem!";

                    exchange.sendResponseHeaders(
                            400,
                            resposta.length()
                    );

                    OutputStream os =
                            exchange.getResponseBody();

                    os.write(resposta.getBytes());

                    os.close();

                    return;
                }

                try {

                    Connection conn =
                            Conexao.conectar();

                    String criarTabela =
                            "CREATE TABLE IF NOT EXISTS usuarios (" +
                            "id INTEGER PRIMARY KEY AUTOINCREMENT," +
                            "nome TEXT," +
                            "sobrenome TEXT," +
                            "dataNascimento TEXT," +
                            "email TEXT," +
                            "senha TEXT," +
                            "telefone TEXT" +
                            ")";

                    conn.createStatement().execute(criarTabela);

                    String sql =
                            "INSERT INTO usuarios " +
                            "(nome, sobrenome, dataNascimento, email, senha, telefone) " +
                            "VALUES (?, ?, ?, ?, ?, ?)";

                    PreparedStatement stmt =
                            conn.prepareStatement(sql);

                    stmt.setString(1, nome);
                    stmt.setString(2, sobrenome);
                    stmt.setString(3, data);
                    stmt.setString(4, email);
                    stmt.setString(5, senha);
                    stmt.setString(6, telefone);

                    stmt.executeUpdate();

                    stmt.close();
                    conn.close();

                    System.out.println(
                            "Usuário cadastrado!"
                    );


                    // assim que terminar entra aqui a página inicial do projeto
                    exchange.getResponseHeaders().add(
                            "Location",
                            "http://127.0.0.1:5500/index.html"
                    );

                    exchange.sendResponseHeaders(302, -1);

                } catch (Exception e) {

                    e.printStackTrace();
                }
            }
        });

        server.start();

        System.out.println(
                "Servidor rodando em http://localhost:8080"
        );
    }
}