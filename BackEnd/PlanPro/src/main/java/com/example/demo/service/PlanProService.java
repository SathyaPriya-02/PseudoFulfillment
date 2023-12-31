package com.example.demo.service;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;
import java.util.Random;

import javax.activation.DataHandler;
import javax.activation.FileDataSource;
import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.RechargePayment;
import com.example.demo.entity.RequestSim;
import com.example.demo.repository.RechargePaymentRepo;
import com.example.demo.repository.RequestSimRepo;
import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Chunk;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.FontFactory;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfWriter;

@Service
public class PlanProService {
	
	
	@Autowired
	 RequestSimRepo simrepo;
	
	@Autowired
	RechargePaymentRepo payrepo;
	
	public static void sendEmail(Session session, String fromEmail, String subject, String body, String toEmail) {
	try {
		MimeMessage msg = new MimeMessage(session);
		msg.addHeader("Content-type", "text/HTML; charset=UTF-8");
		msg.addHeader("format", "flowed");
		msg.addHeader("Content-Transfer-Encoding", "8bit");
		msg.setFrom(new InternetAddress(fromEmail));
		msg.setRecipients(Message.RecipientType.TO, InternetAddress.parse(toEmail));
		msg.setSubject(subject, "UTF-8");
		msg.setSentDate(new Date());
		msg.setText(body, "UTF-8");

		// Add DKIM and SPF headers here if you have configured them
		System.out.println("Message is ready");
		Transport.send(msg);
		System.out.println("Email Sent Successfully!!");
	} catch (Exception e) {
		e.printStackTrace();
	}
	}

	public Map<String, String> sendMail(String emailAddress) {
	    System.out.println("Outlook Email Start");
	    String smtpHostServer = "smtp.office365.com";
	    final String emailID = "priya.jp0210@outlook.com";
	    final String password = "Welcome@123";
	    String toEmail = emailAddress;
	    String phoneNumber = generateRandomPhoneNumber();
	    String simNumber = generateSimCardNumber();
	    String activationToken = generateActivationToken();
	    System.out.println("Generated Phone Number from send mail: " + phoneNumber);
	    System.out.println("Generated SIM Number from send mail: " + simNumber);
	    System.out.println(activationToken);

	    String subject = "Your Plan Pro SIM Card Information";
	    String activationLink = "http://localhost:4200/starter-recharge";
	    System.out.println("Activation Link " + activationLink);

	    // Compose the email body
	    String messageBody = "<html>" +
	            "<head>" +
	            "<style>" +
	            "  h1 { color: #FF0000; }" +
	            "  p { font-size: 16px; }" +
	            "  a { color: #3498db; text-decoration: none; }" +
	            "  a:hover { text-decoration: underline; }" +
	            "</style>" +
	            "</head>" +
	            "<body>" +
	            "<h1>Welcome to Plan Pro!</h1>" +
	            "<p>Thank you for choosing Plan Pro for your mobile needs. Your SIM card information is below:</p>" +
	            "<p><strong>SIM Number:</strong> " + simNumber + "</p>" +
	            "<p><strong>Phone Number:</strong> " + phoneNumber + "</p>" +
	            "<p>To activate your account, please click on the following link:</p>" +
	            "<a href='" + activationLink + "'>" + activationLink + "</a>" +
	            "<p>We're excited to have you on board. Enjoy the world of Plan Pro!</p>" +
	            "</body>" +
	            "</html>";

	    Map<String, String> response = new HashMap<>();
	    response.put("phoneNumber", phoneNumber);
	    response.put("simNumber", simNumber);
	    response.put("activationToken", activationToken);

	    Properties props = new Properties();
	    props.put("mail.smtp.host", smtpHostServer);
	    props.put("mail.smtp.port", "587");
	    props.put("mail.smtp.auth", "true");
	    props.put("mail.smtp.starttls.enable", "true");
	    Session session = Session.getInstance(props, new Authenticator() {
	        protected PasswordAuthentication getPasswordAuthentication() {
	            return new PasswordAuthentication(emailID, password);
	        }
	    });

	    // Create the MimeMessage
	    MimeMessage msg = new MimeMessage(session);
	    try {
			msg.setFrom(new InternetAddress(emailID));
		} catch (MessagingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	    try {
			msg.setRecipients(Message.RecipientType.TO, InternetAddress.parse(toEmail));
		} catch (MessagingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	    try {
			msg.setSubject(subject, "UTF-8");
		} catch (MessagingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	    // Set the content type to HTML
	    try {
			msg.setContent(messageBody, "text/html; charset=utf-8");
		} catch (MessagingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	    // Send the email
	    try {
			Transport.send(msg);
		} catch (MessagingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	    return response;
	}

	
	public String generateRandomPhoneNumber() {
	    Random random = new Random();
	    StringBuilder phoneNumber = new StringBuilder();
	    phoneNumber.append(random.nextInt(2) + 8); // Start with 8 or 9

	    // Generate the remaining 9 digits
	    for (int i = 0; i < 9; i++) {
	        int digit = random.nextInt(10); // Generate a random digit between 0 and 9
	        phoneNumber.append(digit);
	    }

	    return phoneNumber.toString();
	}
	
	
	public static String generateSimCardNumber() {
        // Define the length of the SIM card number you want to generate
        int simCardNumberLength = 12; // Adjust the length as needed

        // Characters allowed in the SIM card number
        String characters = "0123456789";
        
        // Create a StringBuilder to store the generated SIM card number
        StringBuilder simCardNumber = new StringBuilder();

        // Create an instance of Random
        Random random = new Random();

        // Generate the SIM card number
        for (int i = 0; i < simCardNumberLength; i++) {
            int randomIndex = random.nextInt(characters.length());
            char randomChar = characters.charAt(randomIndex);
            simCardNumber.append(randomChar);
        }
        System.out.println(simCardNumber);
        return simCardNumber.toString();
    }
	
	
	public String generateActivationToken() {
        int tokenLength = 16; // Define the length of the activation token as needed
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"; // Define the characters allowed in the token

        StringBuilder token = new StringBuilder();

        Random random = new Random();

        for (int i = 0; i < tokenLength; i++) {
            int randomIndex = random.nextInt(characters.length());
            char randomChar = characters.charAt(randomIndex);
            token.append(randomChar);
        }

        return token.toString();
    }
	
	public boolean activateUser(String simnumber,String phonenumber, String name,String planname, int validity, int price,String rechargeDate,String transactionId) {
	    // Retrieve the user by activation token
		System.out.println("for pay "+phonenumber);
		System.out.println("active ser" +planname);
	    RequestSim user = simrepo.findByPhonenumber(phonenumber);
	    RechargePayment pay = new RechargePayment();
	    

	    if (user != null) {
	        // Update the user's status to "active"
	        user.setStatus("active");
	        user.setCurrent_plan(planname);
	    }
           // Update other payment properties
	        pay.setPhonenumber(phonenumber);
	        pay.setSimnumber(simnumber);
	        pay.setPlanname(planname);
	        pay.setFirstname(name);
	        pay.setValidity(validity);
	        pay.setPrice(price);
	        pay.setRechargedate(rechargeDate);
	        pay.setTransactionid(transactionId);
	        System.out.println("Value updated");
	        if (validity > 0) {
	                try {
	                    // Parse the recharge date string to a Date
	                    SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
	                    Date date = dateFormat.parse(rechargeDate);

	                    // Calculate the expiration date by adding validity days
	                    Calendar calendar = Calendar.getInstance();
	                    calendar.setTime(date);
	                    calendar.add(Calendar.DATE, validity);

	                    // Get the expiration date as a Date
	                    Date expirationDate = calendar.getTime();

	                    // Format the expiration date as a string with the desired format (only date)
	                    String formattedExpirationDate = dateFormat.format(expirationDate);

	                    // Update the user's expiration date
	                    // user.setExpiredate(formattedExpirationDate);
	                    pay.setExpiredate(formattedExpirationDate);
	                    user.setExpire_date(formattedExpirationDate);
	                } catch (ParseException e) {
	                    e.printStackTrace();
	                    return false; // Return false if there is a parsing error
	                }
	            }

	            
	            payrepo.save(pay);
	            simrepo.save(user);

	        return true; // Activation was successful
	    

	   
	}
	
	
	 public RechargePayment updatePayment(String emailid,String firstname,String phonenumber,String simnumber, String planname,  double price,int validity,String rechargedate,String transactionId) {
	        // Find the payment by phone number
		 		RequestSim user = simrepo.findByPhonenumber(phonenumber);
		 		if(user != null)
		 		{
		 			user.setCurrent_plan(planname);
		 		}

		 		RechargePayment payment = new RechargePayment();
	            // Update payment information
		 		payment.setPhonenumber(phonenumber);
		 		payment.setSimnumber(simnumber);
	        	payment.setFirstname(firstname);
	            payment.setPlanname(planname);
	            payment.setValidity(validity);
	            payment.setPrice(price);
	            payment.setRechargedate(rechargedate);
	            payment.setTransactionid(transactionId);
	            payment.setEmailid(emailid);

	            if (validity > 0) {
	                
	                    // Parse the recharge date string to a Date
	                    SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
	                    Date date = null;
						try {
							date = dateFormat.parse(rechargedate);
						} catch (ParseException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}

	                    // Calculate the expiration date by adding validity days
	                    Calendar calendar = Calendar.getInstance();
	                    calendar.setTime(date);
	                    calendar.add(Calendar.DATE, validity);

	                    // Get the expiration date as a Date
	                    Date expirationDate = calendar.getTime();

	                    // Format the expiration date as a string with the desired format (only date)
	                    String formattedExpirationDate = dateFormat.format(expirationDate);

	                    // Update the user's expiration date
	                    // user.setExpiredate(formattedExpirationDate);
	                    payment.setExpiredate(formattedExpirationDate);
	                    user.setExpire_date(formattedExpirationDate);
	                
	            }
	            // Save the updated payment
	            return payrepo.save(payment);
	        
	    }
	 
	 public void generatePdfBill(String emailAddress,String username,String phonenumber,String planname,String price,String validity,String transactionid) throws DocumentException, FileNotFoundException {

		 
		 	System.out.println(username);
		 	System.out.println(phonenumber);
		 
	    	Document document = new Document(PageSize.A4, 50, 50, 50, 50);

	        PdfWriter writer = PdfWriter.getInstance(document, new FileOutputStream("RechargeInvoice.pdf"));

	        writer.setPdfVersion(PdfWriter.VERSION_1_7);

	 

	        Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 24, BaseColor.DARK_GRAY);

	 

	        Font headerFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 14, BaseColor.BLACK);

	 

	        Font normalFont = FontFactory.getFont(FontFactory.HELVETICA, 12, BaseColor.BLACK);

	 

	        BaseColor accentColor = new BaseColor(0, 102, 204);

	 

	        document.open();

	 

	        Paragraph title = new Paragraph("Recharge Invoice", titleFont);

	 

	        title.setAlignment(Element.ALIGN_CENTER);

	 

	        document.add(title);

	 

	 

	        SimpleDateFormat dateFormat = new SimpleDateFormat("dd MMMM yyyy");

	        String invoiceDate = dateFormat.format(new Date());

	        Paragraph invoiceDetails = new Paragraph("Invoice Date: " + invoiceDate);

	 

	        invoiceDetails.setAlignment(Element.ALIGN_RIGHT);

	 

	        document.add(invoiceDetails);

	 

	        Paragraph customerInfo = new Paragraph("Customer Information:", headerFont);

	 

	        customerInfo.add(new Chunk("\nName: "+username+"\nEmail: "+emailAddress, normalFont));

	 

	        document.add(customerInfo);

	        Paragraph rechargeInfo = new Paragraph("Recharge Details:", headerFont);

	 

	        rechargeInfo.add(new Chunk("\nTransaction ID: "+transactionid+"\nPlan Name : "+planname+"\nRecharge Amount: "+price+"\nValidity"+validity+"\nMobile Number: "+phonenumber, normalFont));

	 

	        document.add(rechargeInfo);

	      

	        Paragraph total = new Paragraph("Total Amount: "+price, headerFont);

	        total.setAlignment(Element.ALIGN_RIGHT);

	        document.add(total);

	 

	        document.close();

	 

	 

	 

	        System.out.println("recharge invoice generated successfully!");

	    

			

		}

	    public String sendMail(String emailAddress, String userName, String phonenumber,String planname,String price,String validity,String transactionid) throws FileNotFoundException, DocumentException, MessagingException {

	        System.out.println("Outlook Email Start");

	 

	        String smtpHostServer = "smtp.office365.com";

	        final String emailID = "priya.jp0210@outlook.com";

	        final String password = "Welcome@123";

	        String toEmail = emailAddress;

	 

	        generatePdfBill(emailAddress,userName,phonenumber,planname,price,validity,transactionid);

	        String pdfFilePath = "RechargeInvoice.pdf";

	        String subject = "Hi, " + userName + " - Recharge Done Succesfully";

	 

	       

	        String cssStyles = "<style>" +

	                "body { font-family: Arial, sans-serif; background-color: #f2f2f2; }" +

	                "h2 { font-size: 18px; color: #333; }" +

	                "#container { background-color: #fff; border-radius: 5px; padding: 20px; margin: 20px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2); }" +

	                ".greeting { font-size: 24px; color: #FF0000; }" +

	                "</style>";

	 

	       

	        String greetingMessage = " Your recharge details.";

	 

	       

//	        String activationInstructions = "<p>To activate your new SIM card, please follow these steps:</p>" +
//
//	                "<ol>" +
//
//	                "<li>Insert the SIM card into your mobile device.</li>" +
//
//	                "<li>Power on your device and follow the on-screen instructions for activation.</li>" +
//
//	                "<li>If you encounter any issues, please contact our customer support.</li>" +
//
//	                "</ol>";

	 

	       

	        String messageBody = "<!DOCTYPE html>\r\n"

	                + "<html>\r\n"

	                + "<head>\r\n"

	                + cssStyles

	                + "</head>\r\n"

	                + "<body>\r\n"

	                + "  <div id=\"container\">\r\n"

	                + "    <p class=\"greeting\">" + greetingMessage + "</p>\r\n"

	              //  + activationInstructions

	              //  + "    <p>Here are your new SIM card details:</p>\r\n"

	                

	                + "</body>\r\n"

	                + "</html>\r\n";

	        Properties props = new Properties();

	        props.put("mail.smtp.host", smtpHostServer);

	        props.put("mail.smtp.port", "587");

	        props.put("mail.smtp.auth", "true");

	        props.put("mail.smtp.starttls.enable", "true");

	 

	        Session session = Session.getInstance(props, new Authenticator() {

	            protected PasswordAuthentication getPasswordAuthentication() {

	                return new PasswordAuthentication(emailID, password);

	            }

	        });

	 

	        MimeMessage msg = new MimeMessage(session);

	 

	     

	        MimeMultipart multipart = new MimeMultipart();

	 

	      

	        MimeBodyPart messageBodyPart = new MimeBodyPart();

	        messageBodyPart.setContent(messageBody, "text/html; charset=utf-8");

	        multipart.addBodyPart(messageBodyPart);

	 

	       

	        MimeBodyPart attachmentPart = new MimeBodyPart();

	        FileDataSource source = new FileDataSource(pdfFilePath);

	        attachmentPart.setDataHandler(new DataHandler(source));

	        attachmentPart.setFileName(pdfFilePath);

	        multipart.addBodyPart(attachmentPart);

	 

	        

	        msg.setContent(multipart);

	 

	      

	        msg.setFrom(new InternetAddress(emailID));

	        msg.setRecipients(Message.RecipientType.TO, InternetAddress.parse(toEmail));

	        msg.setSubject(subject, "UTF-8");

	        msg.setSentDate(new Date());

	 

	       

	        Transport.send(msg);

	        System.out.println("Email Sent Successfully!!");

	    

	    return "Email sent successfully";

	}

	 
	   

	    public String generateTransactionId(String phoneNumber) {
	        // Get the current date and time
	        LocalDateTime now = LocalDateTime.now();

	        // Generate a random number
	        Random random = new Random();
	        int randomValue = random.nextInt(10000);

	        // Combine the elements to create a unique transaction ID as a string
	        DecimalFormat decimalFormat = new DecimalFormat("0");
	        decimalFormat.setMaximumFractionDigits(0);
	        String transactionId = phoneNumber+decimalFormat.format(randomValue);

	        // You can hash or encrypt the transaction ID if needed
	        // For example: transactionId = hashFunction(transactionId);

	        return transactionId;
	    }


}

