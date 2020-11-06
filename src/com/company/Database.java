package com.company;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

/**
 * @author Robin Persson,
 */
public class Database {
    private Connection conn;

    public Database(){
        try {
            conn = DriverManager.getConnection("jdbc:sqlite:PIMdb.db");
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void addContentToDB(String content){
        try{
            PreparedStatement stmt = conn.prepareStatement("INSERT INTO todos (text) VALUES(?);");
            stmt.setString(1, content);
            stmt.executeUpdate();
        }
        catch(Exception e){
            e.printStackTrace();
        }
    }
}
