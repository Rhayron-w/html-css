import java.sql.Connection;
import java.sql.DriverManager;

public class Conexao {

    private static final String URL =
            "jdbc:sqlite:banco.db";

    public static Connection conectar() {

        Connection conn = null;

        try {

            Class.forName("org.sqlite.JDBC");

            conn = DriverManager.getConnection(URL);

            System.out.println("Banco conectado!");

        } catch (Exception e) {

            e.printStackTrace();
        }

        return conn;
    }
}