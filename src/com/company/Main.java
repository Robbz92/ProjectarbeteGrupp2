package com.company;

import express.Express;
import express.middleware.Middleware;
import org.apache.commons.fileupload.FileItem;

import java.io.IOException;
import java.nio.file.Paths;
import java.util.List;

public class Main {


    public static void main(String[] args) {
        Database db = new Database();
        Express app = new Express();

        // add todoo items in sql
        app.post("/rest/notes", (req,res) ->{
            String content = (String)req.getBody().get("text");
            db.addContentToDB(content);

            res.send("Ok");
        });
        
        // Path to HTML/CSS/JS
        try {
            app.use(Middleware.statics(Paths.get("www").toString()));
        } catch (IOException e) {
            e.printStackTrace();
        }
//Add pictures
        app.get("/rest/posts", (req, res) -> {
            List<postedPictures> posts = db.getPosts();
            res.json(posts);
        });

        app.get("/rest/posts/:id", (req, res) -> {
            int id = Integer.parseInt(req.getParam("id"));

            postedPictures post = db.getPostById(id);
            res.json(post);
        });

        app.post("/rest/posts", (req, res) -> {
            postedPictures post = (postedPictures) req.getBody(postedPictures.class);

            db.createPost(post);
            res.send("post OK");
        });

        app.post("/api/file-upload", (req, res) -> {
            String imageUrl = null;

            // extract the file from the FormData
            try {
                List<FileItem> files = req.getFormData("files");
                imageUrl = db.uploadImage(files.get(0));
            } catch (Exception e) {
                e.printStackTrace();
            }
            // return "/uploads/image-name.jpg
            res.send(imageUrl);
        });

        // will serve both the html/css/js files and the uploads folder
        try {
            app.use(Middleware.statics(Paths.get("www").toString()));
        } catch (IOException e) {
            e.printStackTrace();
        }




        // Port server is listening on
        app.listen(4000);
        System.out.println("Server listen on port 4000");
    }
}
