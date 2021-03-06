package com.devengers.service.sessionmanagement.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.devengers.service.sessionmanagement.model.UserSessionDetail;

import java.util.List;

@Repository
public interface SessionDetailsRepository extends CrudRepository<UserSessionDetail, String> {

	List<UserSessionDetail> findByuserid(final String userid);
}
