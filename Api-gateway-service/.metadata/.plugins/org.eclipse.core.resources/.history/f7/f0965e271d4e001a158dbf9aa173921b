package com.devengers.sessionhandling.sessionservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.devengers.sessionhandling.sessionservice.model.UserSessionDetail;

import java.util.List;

public interface SessionDetailsRepository extends JpaRepository<UserSessionDetail, Integer> {
    List<UserSessionDetail> findByUserName(String username);
}
