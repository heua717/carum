package com.a101.carum;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;


@EnableScheduling
@SpringBootApplication
public class CarumApplication {
	public static void main(String[] args) {
		SpringApplication.run(CarumApplication.class, args);
	}

}
