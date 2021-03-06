package com.devengers.service.sessionmanagement.rabbitmq;

import java.util.List;

import org.json.JSONObject;
import org.springframework.amqp.core.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.devengers.service.sessionmanagement.model.UserSessionDetail;
import com.devengers.service.sessionmanagement.repository.SessionDetailsRepository;

import org.springframework.amqp.core.MessageListener;


//@EnableJpaRepositories(basePackages = "com.devengers.service.sessionmanagement.repository")
@Component
public class Consumer implements MessageListener {
	
	public Consumer() {
	 System.out.println("Constructor called");
	}
	String str = "";

	@Autowired
	private SessionDetailsRepository quotesRepository;
	
	@Override
	public void onMessage(Message message) {

		System.out.println(new String(message.getBody()));
		byte[] body = message.getBody();
		if (body != null) {
			str = new String(body);
			JSONObject json = new JSONObject(str);
			System.out.println(json.toString());
			String user = (String) json.get("userid");
			int correl = (int) json.get("correlationid");
			String files = (String) json.get("no_of_files");
			System.out.println("userid is: " + user);
			System.out.println("correl is :" + correl);

			System.out.println("files is :" + files);

			UserSessionDetail usersessiondetail = new UserSessionDetail();
			usersessiondetail.setUserid(user);
			usersessiondetail.setCorrelationId(correl);
			usersessiondetail.setNo_of_files(files);
			System.out.println("**********" + usersessiondetail);
			if (usersessiondetail != null) {
				String temp = usersessiondetail.getUserid();
				System.out.println("GETUUSEERIIDD"+temp);
				quotesRepository.save(usersessiondetail);
			//	quotesRepository.save(usersessiondetail);
			}
			// ssr.details(usersessiondetail);

			System.out.println("Do we reach here ");
		}
	}

}
