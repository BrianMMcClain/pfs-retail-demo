package com.github.brianmmcclain.pfsretaildemo;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class ShopController {

    @GetMapping("/")
    public String index(Model model) {
        return "index";
    }

    @GetMapping("/inventory")
    @ResponseBody
    public String inventory() {
        String req = "{\"action\": \"inventory\"}";
        return postToInventory(req);
    }

    @PostMapping("/recommendations")
    @ResponseBody
    public String recommendations(@RequestBody String body) {
        String req = "{\"action\": \"recommendations\", \"value\": \"" + body + "\"}";
        return postToInventory(req);
    }

    @PostMapping("/checkout")
    @ResponseBody
    public String checkout(@RequestBody String body) {
        String req = "{\"action\": \"checkout\", \"value\": \"" + body + "\"}";
        return postToInventory(req);
    }

    private String postToInventory(String j) {
        try {

            String inventoryUrl = System.getenv("INVENTORY_URL");
            if (inventoryUrl == null) {
                inventoryUrl = "http://localhost:8081";
            }

            URL url = new URL(inventoryUrl);
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setDoOutput(true);
            con.setRequestMethod("POST");
            con.setRequestProperty("Content-Type", "text/plain");

            byte[] outB = j.getBytes("UTF-8");
            OutputStream os = con.getOutputStream();
            os.write(outB);
            os.close();

            BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
            String inputLine;
            StringBuffer buffer = new StringBuffer();
            while ((inputLine = in.readLine()) != null) {
                buffer.append(inputLine);
            }
            in.close();

            System.out.println(buffer.toString());
            
            return buffer.toString();

        } catch (Exception e) {
            e.printStackTrace();
            return "error";
        }

    }
}