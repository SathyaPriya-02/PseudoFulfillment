package com.example.demo.controller;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.CacheControl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.RechargePayment;
import com.example.demo.entity.RechargePlans;
import com.example.demo.entity.RequestSim;
import com.example.demo.repository.RechargePaymentRepo;
import com.example.demo.repository.RechargePlanRepo;
import com.example.demo.repository.RequestSimRepo;
import com.example.demo.service.PlanProService;

@RestController

@RequestMapping("/user")
public class RequestSimController 
{

	@Autowired
	RequestSimRepo simrepo;
	
	@Autowired
	RechargePlanRepo planrepo;
	
	@Autowired
	PlanProService ps;
	
	@Autowired
	RechargePaymentRepo rechargerepo;
	
	//storing new user here
	@ResponseBody
	@PostMapping("/newuser")
	@CrossOrigin(origins="http://localhost:4200")
	public String addProduct(@RequestBody RequestSim rs)
	{
		System.out.println("registered details "+rs);
		rs.setStatus("inactive");
		simrepo.save(rs);
		return "added";
	}
	
//	@ResponseBody
//	@PostMapping("/userpayment")
//	@CrossOrigin(origins="http://localhost:4200")
//	public String addToPaymentTable(@RequestBody RechargePayment pay)
//	{
//		System.out.println("recharge table updated "+pay);
//		rechargerepo.save(pay);
//		return "added";
//	}
	
	
	//send phone number and simcard number in mail
	@ResponseBody
	@PostMapping("/sendmail")
	@CrossOrigin(origins="http://localhost:4200")
	public Map<String, String> sendMail(@RequestBody String email)
	{
		System.out.println("Email id for sending phone number and sim card number" +email);
		String emailAddress=email;
		Map<String, String> response = ps.sendMail(emailAddress);
		return response;		
	}
	
	
	
	@GetMapping("/detail/{phoneNumber}")
	@CrossOrigin(origins="http://localhost:4200")
	public ResponseEntity<RequestSim> getUserDetails(@PathVariable String phoneNumber)
	 {
		 System.out.println(phoneNumber);
	        // Assuming you have a UserRepository to fetch user details
	        RequestSim user = simrepo.findByPhonenumber(phoneNumber);
	        System.out.println("details "+user);
	        CacheControl cacheControl = CacheControl.noStore().mustRevalidate();
	        if (user != null) {
	        	System.out.println(user);
	        	return ResponseEntity.ok()
	                    .cacheControl(cacheControl)
	                    .body(user);
	        } else {
	            return ResponseEntity.notFound().build();
	        }
	    }
	 
	 @CrossOrigin(origins="http://localhost:4200")
	 @GetMapping("/plan")
	 @ResponseBody
	 public List<RechargePlans> viewProduct()
	 {
		return planrepo.findAll();
	 }
	 
	 
	 @GetMapping("/searchplan/{searchText}")
	 @CrossOrigin(origins="http://localhost:4200")
	 public List<RechargePlans> searchPlans(@PathVariable String searchText) {
	     System.out.println(searchText);
	     //return planrepo.findByPlanname(searchText);
	     List<RechargePlans> matchingPlans = new ArrayList<>();

	     List<RechargePlans> plans = planrepo.findAll(); // Assuming planrepo is your repository for RechargePlans

	     for (RechargePlans plan : plans) {
	         if (containsSearchText(plan, searchText)) {
	             matchingPlans.add(plan);
	         }
	     }

	     return matchingPlans;
	 }
	 
	 private boolean containsSearchText(RechargePlans plan, String searchText) {
	        if (plan.getPlanname() != null && plan.getPlanname().toLowerCase().contains(searchText)) {
	            return true;
	        }
	        if (plan.getPlanDescription() != null && plan.getPlanDescription().toLowerCase().contains(searchText)) {
	            return true;
	        }
	        if (plan.getPrice() != null && plan.getPrice().toLowerCase().contains(searchText)) {
	            return true;
	        }
	        if (plan.getValidity() != null && plan.getValidity().toLowerCase().contains(searchText)) {
	            return true;
	        }
	        return false;
	    }
	 
	 

	 
	 
	 @PostMapping("/activate/{phonenumber}")
	 @CrossOrigin(origins="http://localhost:4200")
	 public ResponseEntity<String> activateUser(@PathVariable String phonenumber,@RequestBody Map<String, String> requestBody) {
	        System.out.println("Im there "+phonenumber);
		 	String planname = requestBody.get("planname");
	        String validity = requestBody.get("validity");
	        String price = requestBody.get("price");
	        String name = requestBody.get("userName");
	        String simnumber = requestBody.get("simnumber");
	        int validityAsInt = Integer.parseInt(validity);
	        int priceAsInt = Integer.parseInt(price);
	        
	        LocalDate currentDate = LocalDate.now();
	        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd"); // Change the pattern as needed
	        // Format the LocalDate as a string
	        String formattedDate = currentDate.format(formatter);
	        String transactionId = ps.generateTransactionId(phonenumber);
	        System.out.println("active "+planname);
	        System.out.println(validityAsInt);
	        System.out.println(priceAsInt);
	        System.out.println(formattedDate);
	       
	        
	        boolean activationSuccessful = ps.activateUser(simnumber,phonenumber,name,planname,validityAsInt,priceAsInt,formattedDate,transactionId );

	        if (activationSuccessful) {
	            return ResponseEntity.ok(transactionId);
	        } else {
	            return ResponseEntity.badRequest().body("Invalid activation token");
	        }
	    }
	 
	 
	 
	 @PostMapping("/recharge/{phonenumber}")
	 @CrossOrigin(origins="http://localhost:4200")
	 public ResponseEntity<String> recharge(
	            @PathVariable String phonenumber,
	            @RequestBody Map<String, String> requestBody) {
		 	String firstname = requestBody.get("userName");
		 	System.out.println("recharge"+firstname);
	        String planname = requestBody.get("planname");
	        System.out.println(planname);
	        String validity = requestBody.get("validity");
	        System.out.println(validity);
	        String emailid = requestBody.get("emailid");
	        String price = requestBody.get("price");
	        System.out.println(price);
	        int validityAsInt = Integer.parseInt(validity);
	        
	        String simnumber = requestBody.get("simnumber");
	        System.out.println("new sim "+simnumber);
	        
	        LocalDate currentDate = LocalDate.now();
	        
	        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd"); // Change the pattern as needed

	        // Format the LocalDate as a string
	        String formattedDate = currentDate.format(formatter);

	        
	        System.out.println(validityAsInt);
	        double priceAsDouble = Double.parseDouble(price); // Parse as double
	        System.out.println(priceAsDouble);
	       
	        String transactionId = ps.generateTransactionId(phonenumber);
	        System.out.println("tid "+transactionId);
	        
	        RechargePayment updatedPayment = ps.updatePayment(emailid,firstname,phonenumber,simnumber,planname,priceAsDouble,validityAsInt,formattedDate,transactionId);

	        if (updatedPayment != null) {
	        	System.out.println("before return "+transactionId);
	            return ResponseEntity.ok(transactionId);
	        } else {
	            return ResponseEntity.badRequest().body("Payment not found for the given phone number");
	        }
	    }
	 
	 @CrossOrigin(origins="http://localhost:4200")
	 @PostMapping("/generate-bill/{emailAddress}")
	 public ResponseEntity<String> generateBill(@PathVariable String emailAddress,
	            @RequestBody Map<String, String> requestBody){
		 
		 System.out.println(emailAddress);
		 String firstname = requestBody.get("firstname");
		 String phonenumber = requestBody.get("phonenumber");
		 String planname = requestBody.get("planname");
	     String validity = requestBody.get("validity");
	     String price = requestBody.get("price");
	     String transactionid = requestBody.get("transactionid");
	     String expiredate = requestBody.get("expiredate");
//	     String rechargedate = billdetails.getRechargedate();
		 
		 System.out.println(firstname+" "+phonenumber+" "+planname+" "+validity+" "+price+" "+transactionid);
	
		 try {
	        	
	        	System.out.println("email for pdf "+emailAddress);

	            ps.generatePdfBill(emailAddress,firstname,phonenumber,planname,validity,price,transactionid);

	            String userName = firstname; // Replace with the actual user name

	            String result = ps.sendMail(emailAddress, firstname ,phonenumber,planname,price,validity,transactionid);

 

	            return ResponseEntity.ok("Bill generated and email sent successfully: " + result);

	        } catch (Exception e) {

	            return ResponseEntity.status(HttpStatus.SC_INTERNAL_SERVER_ERROR).body("Error generating bill and sending email");

	        }

	    }
	 	
	 
	 @CrossOrigin(origins = "http://localhost:4200")
	 @GetMapping("/tid/{tid}")
	 public ResponseEntity<RechargePayment> getUsername(@PathVariable String tid) {
	     // Call your repository method to retrieve the user's name by phone number
	     RechargePayment user = rechargerepo.findByTransactionid(tid);

	     if (user != null) {
	         // Assuming your User entity has a 'name' property
	        
	         return ResponseEntity.ok(user);
	         
	     } else {
	         return ResponseEntity.notFound().build();
	     }
	 }
	 @CrossOrigin(origins = "http://localhost:4200")
	 @PostMapping("/updatewallet/{phonenumber}")
	    public ResponseEntity<?> updateWalletAmount(@PathVariable String phonenumber, @RequestBody int prowallet) {
	        try {
	            // Fetch the user by phone number (you should replace this with your actual user retrieval logic)
	            RequestSim user =simrepo.findByPhonenumber(phonenumber);

	            if (user == null) {
	                return ResponseEntity.notFound().build();
	            }

	            // Update the wallet amount
	            user.setProwallet(prowallet);

	            // Save the updated user with the new wallet amount
	            simrepo.save(user);

	            return ResponseEntity.ok("Wallet amount updated successfully");
	        } catch (Exception e) {
	            return ResponseEntity.status(HttpStatus.SC_INTERNAL_SERVER_ERROR).body("Error updating wallet amount");
	        }
	    }
	 
	 @CrossOrigin(origins = "http://localhost:4200")
	 @PostMapping("/addtowallet/{phonenumber}")
	 public ResponseEntity<?> AddWalletAmount(@PathVariable String phonenumber, @RequestBody Map<String, Integer> requestBody) {
	     try {
	         // Fetch the user by phone number (you should replace this with your actual user retrieval logic)
	         RequestSim user = simrepo.findByPhonenumber(phonenumber);

	         if (user == null) {
	             return ResponseEntity.notFound().build();
	         }

	         // Get the 'amount' from the request body
	         Integer amount = requestBody.get("amount");

	         // Update the wallet amount
	         int currentWalletAmount = user.getProwallet();

	         // Calculate the new wallet amount by adding the entered amount
	         int newWalletAmount = currentWalletAmount + amount;

	         user.setProwallet(newWalletAmount);

	         // Save the updated user with the new wallet amount
	         simrepo.save(user);

	         Map<String, String> response = new HashMap<>();
	         response.put("message", "Wallet amount updated successfully");

	         return ResponseEntity.ok(response);
	     } catch (Exception e) {
	         return ResponseEntity.status(HttpStatus.SC_INTERNAL_SERVER_ERROR).body("Error updating wallet amount");
	     }
	 }
	 
	}
	 	

