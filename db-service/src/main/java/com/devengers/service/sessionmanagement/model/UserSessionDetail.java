package com.devengers.service.sessionmanagement.model;

import java.util.Date;

import javax.persistence.*;


@Entity
public class UserSessionDetail {

		@Id
		@GeneratedValue
		@Column(name="id",updatable = false,nullable = false)
		private int id;
		
		@Column(name="userId")
		private String userid;
		
		@Column(name="name")
	    private Integer correlationid;
		
		@Column(name="no_of_files ")
	    private String no_of_files;
		
		@Column(name="timestamp", columnDefinition="TIMESTAMP DEFAULT CURRENT_TIMESTAMP",insertable=false, updatable=false)
		private Date lastTouched;
		
	    public String getUserid() {
			return userid;
		}

		public void setUserid(String userid) {
			this.userid = userid;
		}

	    public int getCorrelationId() {
	        return correlationid;
	    }

	    public void setCorrelationId(int correlationid) {
	        this.correlationid = correlationid;
	    }

	    public String getNo_of_files() {
			return no_of_files;
		}

		public void setNo_of_files(String no_of_files) {
			this.no_of_files = no_of_files;
		}

}
