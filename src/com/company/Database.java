package com.company;

import express.utils.Utils;

import java.sql.*;
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

    public List<Note> getNotesFromDB(){
        List<Note> notes = new ArrayList<>();

        try{
            PreparedStatement stmt = conn.prepareStatement("SELECT text, id FROM todos");
            ResultSet resultSet = stmt.executeQuery();

            Note[] note = (Note[]) Utils.readResultSetToObject(resultSet, Note[].class);
            notes = List.of(note);

        }catch(Exception e){
            e.printStackTrace();
        }

        return notes;
    }

    public void deleteItemFromDB(int dataID){
        try{
            PreparedStatement stmt = conn.prepareStatement("DELETE FROM todos WHERE id = ?");
            stmt.setInt(1, dataID);
            stmt.executeUpdate();
        }
        catch(Exception e){
            e.printStackTrace();
        }
    }
}
