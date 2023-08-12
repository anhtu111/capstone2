package com.example.Captone2;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@EnableDiscoveryClient
@SpringBootApplication
public class Captone2Application {

	public static void main(String[] args) {
		SpringApplication.run(Captone2Application.class, args);
	}

}
