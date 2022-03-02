package com.accenture.web.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.accenture.web.entities.User;
import com.accenture.web.repository.UserDetailsRepository;

@Service
public class CustomUserService implements UserDetailsService {

	@Autowired
	UserDetailsRepository userDetailsRepository;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userDetailsRepository.findByUsername(username);
		if(null==user) {
			throw new UsernameNotFoundException("Username not found: " +username);
		}
		
		return user;
	}

}
