package com.apigateway.ads;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.rabbitmq.client.ConnectionFactory;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.Channel;


@RestController

@RequestMapping("/apigateway")
public class Controllers {

	@GetMapping("/request")
	public String processRequest(@RequestBody String data )
	{

		System.out.print("Inside");
		System.out.print(data);
		// chose a Character random from this String 
		String AlphaNumericString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
				+ "0123456789"
				+ "abcdefghijklmnopqrstuvxyz"; 

		// create StringBuffer size of AlphaNumericString 
		StringBuilder sb = new StringBuilder(10); 

		for (int i = 0; i < 10; i++) { 

			// generate a random number between 
			// 0 to AlphaNumericString variable length 
			int index 
			= (int)(AlphaNumericString.length() 
					* Math.random()); 

			// add Character one by one in end of sb 
			sb.append(AlphaNumericString 
					.charAt(index)); 
		} 


		ConnectionFactory factory = new ConnectionFactory();
		factory.setHost("localhost");
		try 
		{
			Connection connection = factory.newConnection();
			Channel channel = connection.createChannel();
			channel.queueDeclare("dataretrieval", false, false, false, null);
			channel.basicPublish("","dataretrieval",null,data.getBytes());
			System.out.println(" [x] Sent '" + data + "'");
		}
		catch (Exception e)
		{
			e.printStackTrace();
		}

		return sb.toString(); 


	}

}
