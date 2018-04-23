import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.DateTimeException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Random;
import java.util.UUID;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVPrinter;
import org.apache.commons.csv.CSVRecord;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import javafx.util.Pair;

public class DataCleaner {
	static ScheduledExecutorService progressBar = null;
	static int currentFinished = 0;
	static int currentTotal = 0;
	
	static ArrayList<String> users = new ArrayList<String>();
	static ArrayList<String> sellers = new ArrayList<String>();
	static ArrayList<String> buyers = new ArrayList<String>();
	static ArrayList<String> houses = new ArrayList<String>();
	
	static int userTotal = 0;
	static int houseTotal = 0;
	static int sellerTotal = 0;
	static int buyerTotal = 0;
	static int viewedTotal = 0;
	static int likesTotal = 0;
	
	public static void main(String arg[]) throws FileNotFoundException, IOException {
		
		//cleanUser();
		//cleanHouse();
		//cleanSeller();
		//cleanBuyer();
		//cleanLikes();
		//cleanViewed();
		
		//System.out.println("Total user: " + userTotal);
		//System.out.println("Total seller: " + sellerTotal);
		//System.out.println("Total buyer: " + buyerTotal);
		//System.out.println("Total house: " + houseTotal);
		//System.out.println("Total viewed: " + viewedTotal);
		//System.out.println("Total likes: " + likesTotal);
		
		//geocodeAddr();
		addLikes();
		addViewed();
	}
	
	static void cleanHouse() throws FileNotFoundException, IOException {
		Reader in = new FileReader("properties_2016.csv");
		BufferedWriter writer = Files.newBufferedWriter(Paths.get("house.csv"));
		CSVParser csvParser = new CSVParser(in, CSVFormat.DEFAULT);
		Random random = new Random();
		
		CSVPrinter csvPrinter = new CSVPrinter(writer, CSVFormat.DEFAULT.withHeader("h_id", "u_id", "bathroomCnt", "bedroomCnt", "buildingQualityID", 
				"livingAreaSize", "latitude", "longitude", "lotSize", "cityID", "county", "zip", "yearBuilt", "storyNum", "price", "tax"));
		/*CSVPrinter csvPrinter = new CSVPrinter(writer, CSVFormat.DEFAULT.withHeader("parcelid", "bathroomcnt", "bedroomcnt",
				"buildingqualitytypeid", "calculatedfinishedsquarefeet", "latitude", "longitude", "lotsizesquarefeet", "regionidcity", 
				"regionidcounty", "regionidzip", "yearbuilt", "numberofstories", "taxvaluedollarcnt", "taxamount"));*/
		
		ArrayList<String> sellerCandidate = new ArrayList<String>();
		for(String id : users) {
			if(random.nextFloat() > 0.5)
				sellerCandidate.add(id);
		}
		
		int total = 0;
		int orig_total = 0;
		
		currentFinished = 0;
		currentTotal = (int)(1850000 * 0.07);
		progressBar = Executors.newSingleThreadScheduledExecutor();
		progressBar.scheduleAtFixedRate(new ProgressBar("House"), 0, 300, TimeUnit.MILLISECONDS);
		
		for (CSVRecord record : csvParser) {
			orig_total++;
			
			if(record.getRecordNumber() == 1)
				continue;
			
			if(record.get(0).equals("") || record.get(4).equals("") || record.get(5).equals("") || record.get(7).equals("") || record.get(11).equals("") || 
					record.get(24).equals("") || record.get(25).equals("") || record.get(26).equals("") || record.get(36).equals("") || record.get(37).equals("") || 
					record.get(39) .equals("") || record.get(47).equals("") || record.get(51).equals("") || record.get(54).equals("") || record.get(39).length() > 5)
				continue;
			
			if(random.nextFloat() > 0.07)
				continue;
			
			total++;
			
			String uuid = UUID.randomUUID().toString();
			
			String owner = sellerCandidate.get(random.nextInt(sellerCandidate.size()));
			if(!sellers.contains(owner))
				sellers.add(owner);
			
			houses.add(uuid);
			
			if(record.get(48).equals("")) {
				csvPrinter.printRecord(uuid, owner, record.get(4), record.get(5), record.get(7), record.get(11), 
						Double.parseDouble(record.get(24)) / 1000000.0,	Double.parseDouble(record.get(25)) / 1000000.0, record.get(26), record.get(36), 
						"Los Angeles", record.get(39), record.get(47), "1", record.get(51), record.get(54));
			}
			else {
				csvPrinter.printRecord(uuid, owner, record.get(4), record.get(5), record.get(7), record.get(11), 
						Double.parseDouble(record.get(24)) / 1000000.0,	Double.parseDouble(record.get(25)) / 1000000.0, record.get(26), record.get(36), 
						"Los Angeles", record.get(39), record.get(47), record.get(48), record.get(51), record.get(54));
			}
			
			currentFinished++;
		}
		
		csvPrinter.flush();
		csvParser.close();
		csvPrinter.close();
		
		progressBar.shutdown();
		System.out.println();
		houseTotal = total;
	}
	
	static void cleanUser() throws FileNotFoundException, IOException {
		Reader in_firstname = new FileReader("allfirstnames.csv");
		CSVParser csvParser_first = new CSVParser(in_firstname, CSVFormat.DEFAULT);
		Reader in_lastname = new FileReader("alllastnames.csv");
		CSVParser csvParser_last = new CSVParser(in_lastname, CSVFormat.DEFAULT);
		
		BufferedWriter writer = Files.newBufferedWriter(Paths.get("user.csv"));
		
		Random random = new Random();
		
		CSVPrinter csvPrinter = new CSVPrinter(writer, CSVFormat.DEFAULT.withHeader("u_id", "email", "username", "password", "age", "area", "bio"));
		
		char validPasswordChar[] = {'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 
				'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V',
				'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'};
		
		String states[] = {"AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
				"MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN",
				"TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"};
		
		ArrayList<String> firstnames = new ArrayList<String>();
		ArrayList<String> lastnames = new ArrayList<String>();
		
		for (CSVRecord record : csvParser_first)
			firstnames.add(record.get(0));
		for (CSVRecord record : csvParser_last)
			lastnames.add(record.get(0));
		
		String uuid;
		String email;
		String username;
		String password;
		int age;
		String area;
		String bio = "";
		
		ArrayList<String> emails = new ArrayList<String>();
		
		int total = 100000;
		
		currentFinished = 0;
		currentTotal = total;
		progressBar = Executors.newSingleThreadScheduledExecutor();
		progressBar.scheduleAtFixedRate(new ProgressBar("User"), 0, 300, TimeUnit.MILLISECONDS);
		
		for (int i = 0; i < total; i++) {
			uuid = UUID.randomUUID().toString();
			
			username = firstnames.get(random.nextInt(firstnames.size())) + lastnames.get(random.nextInt(lastnames.size()));
			
			email = username.toLowerCase() + "@gmail.com";
			while(emails.contains(email))
				email = username.toLowerCase() + random.nextInt(1000) + "@gmail.com";
			emails.add(email);
			
			password = "";
			int length = random.nextInt(5) + 8;
			for(int j = 0; j < length; j++)
				password += validPasswordChar[random.nextInt(62)];
			age = random.nextInt(50) + 18;
			area = states[random.nextInt(50)];
			
			users.add(uuid);
			csvPrinter.printRecord(uuid, email, username, password, age, area, bio);
			currentFinished++;
		}
		
		csvPrinter.flush();
		csvPrinter.close();
		csvParser_first.close();
		csvParser_last.close();
		
		progressBar.shutdown();
		System.out.println();
		userTotal = total;
	}
	
	static void cleanSeller() throws FileNotFoundException, IOException {
		BufferedWriter writer = Files.newBufferedWriter(Paths.get("seller.csv"));
		CSVPrinter csvPrinter = new CSVPrinter(writer, CSVFormat.DEFAULT.withHeader("u_id"));
		
		currentFinished = 0;
		currentTotal = sellers.size();
		progressBar = Executors.newSingleThreadScheduledExecutor();
		progressBar.scheduleAtFixedRate(new ProgressBar("Seller"), 0, 300, TimeUnit.MILLISECONDS);
		
		for(String id : sellers) {
			csvPrinter.printRecord(id);
			currentFinished++;
		}
		
		csvPrinter.flush();
		csvPrinter.close();
		
		progressBar.shutdown();
		System.out.println();
		sellerTotal = sellers.size();
	}
	
	static void cleanBuyer() throws FileNotFoundException, IOException {
		BufferedWriter writer = Files.newBufferedWriter(Paths.get("buyer.csv"));
		CSVPrinter csvPrinter = new CSVPrinter(writer, CSVFormat.DEFAULT.withHeader("u_id"));
		
		Random random = new Random();
		
		currentFinished = 0;
		currentTotal = users.size() - sellers.size() + (int)(sellers.size() * 0.3);
		progressBar = Executors.newSingleThreadScheduledExecutor();
		progressBar.scheduleAtFixedRate(new ProgressBar("Buyer"), 0, 300, TimeUnit.MILLISECONDS);
		
		for(String id : users) {
			if(!sellers.contains(id)) {
				buyers.add(id);
				csvPrinter.printRecord(id);
				currentFinished++;
			}
		}
		
		for(String id : sellers) {
			if(random.nextFloat() < 0.3) {
				buyers.add(id);
				csvPrinter.printRecord(id);
				currentFinished++;
			}
		}
		
		csvPrinter.flush();
		csvPrinter.close();
		
		progressBar.shutdown();
		System.out.println();
		buyerTotal = buyers.size();
	}
	
	static void cleanViewed() throws FileNotFoundException, IOException {
		BufferedWriter writer = Files.newBufferedWriter(Paths.get("viewed.csv"));
		CSVPrinter csvPrinter = new CSVPrinter(writer, CSVFormat.DEFAULT.withHeader("u_id", "h_id", "time"));
		
		Random random = new Random();
		
		int target = 200000;
		int total = 0;
		
		ArrayList<Pair<String, String>> vieweds = new ArrayList<Pair<String, String>>();
		
		currentFinished = 0;
		currentTotal = target;
		progressBar = Executors.newSingleThreadScheduledExecutor();
		progressBar.scheduleAtFixedRate(new ProgressBar("Viewed"), 0, 300, TimeUnit.MILLISECONDS);
		
		for(int i = 0; i < target; i++) {
			String uid = buyers.get(random.nextInt(buyers.size()));
			String hid = houses.get(random.nextInt(houses.size()));
			Pair<String, String> viewed = new Pair<String, String>(uid, hid);
			if(!vieweds.contains(viewed)) {
				total++;
				vieweds.add(viewed);
				
				LocalDateTime date = null;
				boolean valid = true;
				do {
					try {
						date = LocalDateTime.of(2018, 12, 31, 23, 59, 59).minusYears(random.nextInt(5)).minusMonths(random.nextInt(12)).minusDays(random.nextInt(31));
					}
					catch(DateTimeException | IllegalArgumentException e) {
						valid = false;
					}
				} while(!valid);
				
				csvPrinter.printRecord(uid, hid, date.toString().substring(0, 10));
				currentFinished++;
			}
		}
		
		csvPrinter.flush();
		csvPrinter.close();
		
		progressBar.shutdown();
		System.out.println();
		viewedTotal = total;
	}
	
	static void cleanLikes() throws FileNotFoundException, IOException {
		BufferedWriter writer = Files.newBufferedWriter(Paths.get("likes.csv"));
		CSVPrinter csvPrinter = new CSVPrinter(writer, CSVFormat.DEFAULT.withHeader("u_id", "h_id"));
		
		Random random = new Random();
		
		int target = 100000;
		int total = 0;
		
		ArrayList<Pair<String, String>> likes = new ArrayList<Pair<String, String>>();
		
		currentFinished = 0;
		currentTotal = target;
		progressBar = Executors.newSingleThreadScheduledExecutor();
		progressBar.scheduleAtFixedRate(new ProgressBar("Likes"), 0, 300, TimeUnit.MILLISECONDS);
		
		for(int i = 0; i < target; i++) {
			String uid = buyers.get(random.nextInt(buyers.size()));
			String hid = houses.get(random.nextInt(houses.size()));
			Pair<String, String> like = new Pair<String, String>(uid, hid);
			if(!likes.contains(like)) {
				total++;
				likes.add(like);
				csvPrinter.printRecord(uid, hid);
				currentFinished++;
			}
		}
		
		csvPrinter.flush();
		csvPrinter.close();
		
		progressBar.shutdown();
		System.out.println();
		likesTotal = total;
	}
	
	static void geocodeAddr() throws MalformedURLException, IOException {
		Reader in = new FileReader("addrHouse.csv");
		BufferedWriter writer = Files.newBufferedWriter(Paths.get("new/newAddrHouse.csv"));
		CSVParser csvParser = new CSVParser(in, CSVFormat.DEFAULT);
		
		CSVPrinter csvPrinter = new CSVPrinter(writer, CSVFormat.DEFAULT.withHeader("h_id", "u_id", "address", "bathroomCnt", "bedroomCnt", "buildingQualityID", 
				"livingAreaSize", "latitude", "longitude", "lotSize", "cityID", "county", "zip", "yearBuilt", "storyNum", "price", "tax"));
		
		currentFinished = 0;
		currentTotal = (int)(131000);
		progressBar = Executors.newSingleThreadScheduledExecutor();
		progressBar.scheduleAtFixedRate(new ProgressBar("Geocoding"), 0, 300, TimeUnit.MILLISECONDS);
		
		boolean reachLimit = false;
		
		for (CSVRecord record : csvParser) {
			if(record.getRecordNumber() == 1)
				continue;
			
			if(!reachLimit) {
				if(record.get(2).equals("")) {
					URL url = new URL("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + record.get(7) + ',' + record.get(8) 
						+ "&key=AIzaSyAHbTvrtAr7iIMx0ZHhwwB3RqgWpRy4fvs");
					HttpURLConnection con = (HttpURLConnection)url.openConnection();
					con.setRequestMethod("GET");
					
					BufferedReader res = new BufferedReader(new InputStreamReader(con.getInputStream()));
					
					String addr = "";
					JsonObject jsonObject = new JsonParser().parse(res).getAsJsonObject();
					
					if(!jsonObject.get("status").getAsString().equals("OK")) {
						reachLimit = true;
						csvPrinter.printRecord(record.get(0), record.get(1), record.get(2), record.get(3), record.get(4), record.get(5), record.get(6), record.get(7), 
								record.get(8), record.get(9), record.get(10), record.get(11), record.get(12), record.get(13), record.get(14), record.get(15), record.get(16));
						res.close();
						con.disconnect();
						continue;
					}
					
					addr = jsonObject.get("results").getAsJsonArray().get(0).getAsJsonObject().get("formatted_address").getAsString();
					
					res.close();
					con.disconnect();
					
					csvPrinter.printRecord(record.get(0), record.get(1), addr, record.get(3), record.get(4), record.get(5), record.get(6), record.get(7), 
						record.get(8), record.get(9), record.get(10), record.get(11), record.get(12), record.get(13), record.get(14), record.get(15), record.get(16));
				}
				else
					csvPrinter.printRecord(record.get(0), record.get(1), record.get(2), record.get(3), record.get(4), record.get(5), record.get(6), record.get(7), 
							record.get(8), record.get(9), record.get(10), record.get(11), record.get(12), record.get(13), record.get(14), record.get(15), record.get(16));
			}
			else
				csvPrinter.printRecord(record.get(0), record.get(1), record.get(2), record.get(3), record.get(4), record.get(5), record.get(6), record.get(7), 
						record.get(8), record.get(9), record.get(10), record.get(11), record.get(12), record.get(13), record.get(14), record.get(15), record.get(16));
			
			currentFinished++;
		}
		
		csvPrinter.flush();
		csvParser.close();
		csvPrinter.close();
		
		progressBar.shutdown();
		System.out.println();
	}
	
	static void addLikes() throws IOException {
		Reader likes_in = new FileReader("likes_1.csv");
		CSVParser csvParser_likes = new CSVParser(likes_in, CSVFormat.DEFAULT);
		Reader buyer_in = new FileReader("buyer.csv");
		CSVParser csvParser_buyer = new CSVParser(buyer_in, CSVFormat.DEFAULT);
		Reader house_in = new FileReader("house.csv");
		CSVParser csvParser_house = new CSVParser(house_in, CSVFormat.DEFAULT);
		BufferedWriter writer = Files.newBufferedWriter(Paths.get("likes_2.csv"));
		CSVPrinter csvPrinter = new CSVPrinter(writer, CSVFormat.DEFAULT.withHeader("u_id", "h_id"));
		
		Random random = new Random();
		
		int total = 0;
		int target = 400000;
		
		currentFinished = 0;
		currentTotal = target;
		progressBar = Executors.newSingleThreadScheduledExecutor();
		progressBar.scheduleAtFixedRate(new ProgressBar("Add Likes"), 0, 300, TimeUnit.MILLISECONDS);
		
		ArrayList<Pair<String, String>> likes = new ArrayList<Pair<String, String>>();
		ArrayList<String> buyers = new ArrayList<String>();
		ArrayList<String> houses = new ArrayList<String>();
		
		for (CSVRecord record : csvParser_buyer) {
			if(record.getRecordNumber() == 1)
				continue;
			buyers.add(record.get(0));
		}
		
		for (CSVRecord record : csvParser_house) {
			if(record.getRecordNumber() == 1)
				continue;
			houses.add(record.get(0));
		}
		
		for (CSVRecord record : csvParser_likes) {
			if(record.getRecordNumber() == 1)
				continue;
			likes.add(new Pair<String, String>(record.get(0), record.get(1)));
			//csvPrinter.printRecord(record.get(0), record.get(1));
			//total++;
		}
		
		for(int i = 0; i < target; i++) {
			String uid = buyers.get(random.nextInt(buyers.size()));
			String hid = houses.get(random.nextInt(houses.size()));
			Pair<String, String> like = new Pair<String, String>(uid, hid);
			if(!likes.contains(like)) {
				likes.add(like);
				csvPrinter.printRecord(uid, hid);
				total++;
			}
			currentFinished++;
		}
		
		csvPrinter.flush();
		csvParser_likes.close();
		csvParser_buyer.close();
		csvParser_house.close();
		csvPrinter.close();
		
		progressBar.shutdown();
		System.out.println("\nTotal likes: " + total);
	}
	
	static void addViewed() throws IOException {
		Reader viewed_in = new FileReader("viewed_1.csv");
		CSVParser csvParser_viewed = new CSVParser(viewed_in, CSVFormat.DEFAULT);
		Reader user_in = new FileReader("user.csv");
		CSVParser csvParser_user = new CSVParser(user_in, CSVFormat.DEFAULT);
		Reader house_in = new FileReader("house.csv");
		CSVParser csvParser_house = new CSVParser(house_in, CSVFormat.DEFAULT);
		BufferedWriter writer = Files.newBufferedWriter(Paths.get("viewed_2.csv"));
		CSVPrinter csvPrinter = new CSVPrinter(writer, CSVFormat.DEFAULT.withHeader("u_id", "h_id", "time"));
		
		Random random = new Random();
		
		int total = 0;
		int target = 500000;
		
		currentFinished = 0;
		currentTotal = target;
		progressBar = Executors.newSingleThreadScheduledExecutor();
		progressBar.scheduleAtFixedRate(new ProgressBar("Add Viewed"), 0, 300, TimeUnit.MILLISECONDS);
		
		ArrayList<ArrayList<String>> viewed = new ArrayList<ArrayList<String>>();
		ArrayList<String> users = new ArrayList<String>();
		ArrayList<String> houses = new ArrayList<String>();
		
		for (CSVRecord record : csvParser_user) {
			if(record.getRecordNumber() == 1)
				continue;
			users.add(record.get(0));
		}
		
		for (CSVRecord record : csvParser_house) {
			if(record.getRecordNumber() == 1)
				continue;
			houses.add(record.get(0));
		}
		
		for (CSVRecord record : csvParser_viewed) {
			if(record.getRecordNumber() == 1)
				continue;
			ArrayList<String> data = new ArrayList<String>();
			data.add(record.get(0));
			data.add(record.get(1));
			data.add(record.get(2));
			viewed.add(data);
			//csvPrinter.printRecord(record.get(0), record.get(1), record.get(2));
			//total++;
		}
		
		for(int i = 0; i < target; i++) {
			String uid = users.get(random.nextInt(users.size()));
			String hid = houses.get(random.nextInt(houses.size()));
			
			LocalDateTime date = null;
			boolean valid = true;
			do {
				try {
					date = LocalDateTime.of(2018, 12, 31, 23, 59, 59).minusYears(random.nextInt(5)).minusMonths(random.nextInt(12)).minusDays(random.nextInt(31));
				}
				catch(DateTimeException | IllegalArgumentException e) {
					valid = false;
				}
			} while(!valid);
			
			String time = date.toString().substring(0, 10);
			
			ArrayList<String> view = new ArrayList<String>();
			view.add(uid);
			view.add(hid);
			view.add(time);
			if(!viewed.contains(view)) {
				viewed.add(view);
				csvPrinter.printRecord(uid, hid, time);
				total++;
			}
			currentFinished++;
		}
		
		csvPrinter.flush();
		csvParser_viewed.close();
		csvParser_user.close();
		csvParser_house.close();
		csvPrinter.close();
		
		progressBar.shutdown();
		System.out.println("\nTotal viewed: " + total);
	}
	
	private static class ProgressBar implements Runnable {
		String task;
		
		ProgressBar(String task) {
			this.task = task;
		}
		
		public void run() {
			displayProcessBar(task, currentFinished, currentTotal);
		}
	}
	
	private static void displayProcessBar(String task, int finished, int total) {
		int p = (int)((float)finished / (float)total * 100);
		System.out.format("\r" + task + " Progress: [%3d%%] [", p);
		for(int i = 0; i < p/2; i++)
			System.out.print('#');
		for(int i = p/2; i < 50; i++)
			System.out.print('.');
		System.out.print(']');
		System.out.flush();
	}
}
