package com.company;

import express.utils.Utils;
import org.apache.commons.fileupload.FileItem;

import java.io.FileOutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.*;
import java.time.Instant;
import express.utils.Utils;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

/**
 * @author Robin Persson,
 */
public class Database {
    private Connection conn;
    private int getCategoryID;
    private String fileName;


    public Database(){
        try {
            conn = DriverManager.getConnection("jdbc:sqlite:PIMdb.db");
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
    ///////////////////////////////////////////////////////////////
    public void addContentToDB(String content, int categoryID){
        try{
            PreparedStatement stmt = conn.prepareStatement("INSERT INTO todos (text,category) VALUES(?,?);");
            stmt.setString(1, content);
            stmt.setInt(2, categoryID);
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

    public List<Note> getSelectiveText(int dataID){
        List<Note> notes = new ArrayList<>();
        try{
            PreparedStatement stmt = conn.prepareStatement("SELECT text FROM todos, categories WHERE categories.id = ? AND todos.category = categories.id order by categories.category DESC;");
            stmt.setInt(1, dataID);
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
    //DB categoriesDB categoriesDB categoriesDB categoriesDB categoriesDB
    public void addCategoriesToDB(String content){
        try{
            PreparedStatement stmt = conn.prepareStatement("INSERT INTO categories (category) VALUES(?);");
            stmt.setString(1, content);
            stmt.executeUpdate();
        }
        catch(Exception e){
            e.printStackTrace();
        }
    }
    public void deleteCategoryFromDB(int categoryDataID){
        try{
            PreparedStatement stmt = conn.prepareStatement("DELETE FROM categories WHERE id = ?");
            stmt.setInt(1, categoryDataID);
            stmt.executeUpdate();
        }
        catch(Exception e){
            e.printStackTrace();
        }
    }
    public List<Categories> getcategoriesFromDB(){
        List<Categories> categoryItems = new ArrayList<>();


        try {
            PreparedStatement stmt = conn.prepareStatement("SELECT id, category FROM categories");
            ResultSet resultSet = stmt.executeQuery();

            while(resultSet.next()){
                int categoryId =resultSet.getInt("id");
                String name = resultSet.getString("category");

                Categories names = new Categories(categoryId,name);
                System.out.println(names);
                categoryItems.add(names);
            } 

        } catch (Exception e) {
            e.printStackTrace();
        }


        return categoryItems;
    }

    //Upload
    //////////////////////////////////////////////////////////////
    public List<BlogPost> getPosts(){
        List<BlogPost> posts = null;

        try {
            PreparedStatement stmt = conn.prepareStatement("SELECT * FROM pictures");
            ResultSet rs = stmt.executeQuery();

            BlogPost[] usersFromRS = (BlogPost[])Utils.readResultSetToObject(rs, BlogPost[].class);
            posts = List.of(usersFromRS);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return posts;
    }

    public BlogPost getPostById(int id){
        BlogPost post = null;

        try {
            PreparedStatement stmt = conn.prepareStatement("SELECT * FROM pictures WHERE id = ?");
            stmt.setInt(1, id);

            ResultSet rs = stmt.executeQuery();
            BlogPost[] usersFromRS = (BlogPost[])Utils.readResultSetToObject(rs, BlogPost[].class);

            post = usersFromRS[0];

        } catch (Exception e) {
            e.printStackTrace();
        }
        return post;
    }

    public void createPost(BlogPost post){
        try{
            PreparedStatement stmt = conn.prepareStatement("INSERT INTO pictures (title, content, timestamp, imageUrl) VALUES(?, ?, ?, ?)");
            stmt.setString(1, post.getTitle());
            stmt.setString(2, post.getContent());
            stmt.setLong(3, Instant.now().toEpochMilli());
            stmt.setString(4, post.getImageUrl());

            stmt.executeUpdate();

        }catch(Exception e){
            e.printStackTrace();
        }
    }

    public String uploadImage(FileItem image){
        fileName = image.getName();
        String imageUrl = "/pictures/" + image.getName();

        try(var os = new FileOutputStream(Paths.get("www" + imageUrl).toString())){
            os.write(image.get());
        }
        catch(Exception e) {
            e.printStackTrace();
            return null;
        }
        return imageUrl;
    }

    public void updatePost(BlogPost post){
        try{
           PreparedStatement stmt = conn.prepareStatement("UPDATE pictures SET title = ?, content = ?, timestamp = ?, imageUrl = ? WHERE id = ?");
           stmt.setString(1, post.getTitle());
           stmt.setString(2, post.getContent());
           stmt.setLong(3, post.getTimestamp());
           stmt.setString(4, post.getImageUrl());
           stmt.setInt(5, post.getId());
           stmt.executeUpdate();

        }catch(Exception e){
            e.printStackTrace();
        }
    }
    //////////////////////////////////////////////////////////////

    // Hantera filer//
    public List<String> readFile(){
        List<String> test = null;

        if(fileName.equals("null")){
            return null;
        }
        else {
            Path path = Paths.get("www/pictures/" + fileName);


            test = new ArrayList<>();

            try {
                List<String> lines = Files.readAllLines(path);
                for (String allLines : lines) {
                    test.add(allLines);
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return test;
    }
}
