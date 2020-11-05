package com.company;

import express.Express;
import express.middleware.Middleware;

import java.io.IOException;
import java.nio.file.Paths;

public class Main {

    public static void main(String[] args) {
        Database db = new Database();
        Express app = new Express();

        System.out.println("tjena allihopa detta är ett test från er SCRUM MASTER(vaktmästare) Andreas");
        System.out.println("skibbedi bababa");
        System.out.println("hallåejjjeasdlfmdäklmfäwp");
        System.out.println("vi gör en ny ändring för att visa hur de funkar");
        System.out.println("En uppdatering!");
        try {
            app.use(Middleware.statics(Paths.get("www").toString()));
        } catch (IOException e) {
            e.printStackTrace();
        }

        app.listen(3000);
        System.out.println("Server listen on port 3000");
    }
}
