package com.foodorder.daos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.foodorder.entities.Admin;

@Repository
public interface AdminDao extends JpaRepository<Admin, String> {

}
