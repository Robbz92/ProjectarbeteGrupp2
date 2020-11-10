package com.company;

import express.Express;
import express.middleware.Middleware;

import java.io.IOException;
import java.nio.file.Paths;

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

        // Port server is listening on
        app.listen(3000);
        System.out.println("Server listen on port 3000");
    }
}
