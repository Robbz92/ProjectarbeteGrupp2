package com.company;

import express.utils.Utils;
import org.apache.commons.fileupload.FileItem;

import java.io.FileOutputStream;
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

    public String uploadImage(FileItem image) {
              // get filename with file.getName()
        String imageUrl = "/pictures/" + image.getName();

        // open an ObjectOutputStream with the path to the pictures folder in the "www" directory
        try (var os = new FileOutputStream(Paths.get("www" + imageUrl).toString())) {
            // get the required byte[] array to save to a file
            // with file.get()
            os.write(image.get());
        } catch (Exception e) {
            e.printStackTrace();
            // if image is not saved, return null
            return null;
        }
        return imageUrl;
    }

    // replace whole entity in database with updated post.
    // the post must have an ID
    public void updatePost(postedPictures post) {
        // validate post ID (present and exists in database)

        try {
            PreparedStatement stmt = conn.prepareStatement("UPDATE posts SET title = ?, content = ?, imageUrl = ?, dateTime = ?, category = ? WHERE id = ?");
            stmt.setString(1, post.getTitle());
            stmt.setString(2, post.getContent());
            stmt.setString(3, post.getImageUrl());
            stmt.setLong(4, post.getDateTime());
            stmt.setInt(5,post.getCategory());
            stmt.setInt(6, post.getId());

            stmt.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public List<postedPictures> getPosts() {
        List<postedPictures> posts = null;

        try {
            PreparedStatement stmt = conn.prepareStatement("SELECT * FROM pictures");
            ResultSet rs = stmt.executeQuery();

            postedPictures[] usersFromRS = (postedPictures[]) Utils.readResultSetToObject(rs, postedPictures[].class);
            posts = List.of(usersFromRS);

        } catch (Exception e) {
            e.printStackTrace();
        }

        return posts;
    }

    public postedPictures getPostById(int id) {
        postedPictures post = null;

        try {
            PreparedStatement stmt = conn.prepareStatement("SELECT * FROM pictures WHERE id = ?");
            stmt.setInt(1, id);

            ResultSet rs = stmt.executeQuery();

            // ResultSet is always an array of items
            postedPictures[] userFromRS = (postedPictures[]) Utils.readResultSetToObject(rs, postedPictures[].class);

            post = userFromRS[0];

        } catch (Exception e) {
            e.printStackTrace();
        }

        return post;
    }

    public void createPost(postedPictures post) {
        try {
            PreparedStatement stmt = conn.prepareStatement("INSERT INTO pictures (title, content, imageUrl, dateTime, category) VALUES(?, ?, ?, ?,?)");
            stmt.setString(1, post.getTitle());
            stmt.setString(2, post.getContent());
            stmt.setString(3, post.getImageUrl());
            stmt.setLong(4, Instant.now().toEpochMilli());
            stmt.setInt(5,post.getCategory());

            stmt.executeUpdate();
        } catch (Exception e) {
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

}
