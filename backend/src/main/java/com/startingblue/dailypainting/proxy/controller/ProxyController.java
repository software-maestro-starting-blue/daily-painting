package com.startingblue.dailypainting.proxy.controller;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;

@RestController
public class ProxyController {

    @CrossOrigin(origins = "*")
    @GetMapping("/proxy")
    public ResponseEntity<byte[]> proxy(@RequestParam("url") String urlString) throws IOException {
        URL url = new URL(urlString);
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestMethod("GET");

        InputStream inputStream = connection.getInputStream();
        byte[] body = StreamUtils.copyToByteArray(inputStream);

        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", connection.getContentType());

        return new ResponseEntity<>(body, headers, HttpStatus.OK);
    }
}
