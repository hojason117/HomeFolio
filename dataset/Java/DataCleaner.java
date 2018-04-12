package temp;

import java.io.BufferedWriter;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.Reader;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Random;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVPrinter;
import org.apache.commons.csv.CSVRecord;

public class DataCleaner {
	public static void main(String arg[]) throws FileNotFoundException, IOException {
		
		Reader in = new FileReader("properties_2016.csv");
		BufferedWriter writer = Files.newBufferedWriter(Paths.get("new_properties_2016.csv"));
		CSVParser csvParser = new CSVParser(in, CSVFormat.DEFAULT);
		Random random = new Random();
		
		CSVPrinter csvPrinter = new CSVPrinter(writer, CSVFormat.DEFAULT.withHeader("h_id", "u_id", "bathroomCnt", "bedroomCnt", "buildingQualityID", 
				"livingAreaSize", "latitude", "longitude", "lotSize", "cityID", "county", "zip", "yearBuilt", "storyNum", "price", "tax"));
		/*CSVPrinter csvPrinter = new CSVPrinter(writer, CSVFormat.DEFAULT.withHeader("parcelid", "bathroomcnt", "bedroomcnt",
				"buildingqualitytypeid", "calculatedfinishedsquarefeet", "latitude", "longitude", "lotsizesquarefeet", "regionidcity", 
				"regionidcounty", "regionidzip", "yearbuilt", "numberofstories", "taxvaluedollarcnt", "taxamount"));*/
		//CSVPrinter csvPrinter = new CSVPrinter(writer, CSVFormat.DEFAULT.withSkipHeaderRecord());
		
		int c48 = 0;
		
		long total = 0;
		long orig_total = 0;
		for (CSVRecord record : csvParser) {
			System.out.println(orig_total++);
			
			if(record.getRecordNumber() == 1)
				continue;
			
			/*if(orig_total >= 500000)
				break;*/
			
			if(record.get(0).equals("") || record.get(4).equals("") || record.get(5).equals("") || record.get(7).equals("") || record.get(11).equals("") || 
					record.get(24).equals("") || record.get(25).equals("") || record.get(26).equals("") || record.get(36).equals("") || record.get(37).equals("") || 
					record.get(39) .equals("") || record.get(47).equals("") || record.get(51).equals("") || record.get(54).equals("") || record.get(39).length() > 5)
				continue;
			
			if(random.nextFloat() > 0.1)
				continue;
			
			total++;
			
			/*csvPrinter.printRecord(record.get("parcelid"), record.get("architecturalstyletypeid"), record.get("bathroomcnt"), record.get("bedroomcnt"), record.get("buildingclasstypeid"), 
					record.get("buildingqualitytypeid"), record.get("calculatedfinishedsquarefeet"), record.get("latitude"), 
					record.get("longitude"), record.get("lotsizesquarefeet"), record.get("regionidzip"), record.get("roomcnt"), 
					record.get("yearbuilt"), record.get("numberofstories"), record.get("structuretaxvaluedollarcnt"), 
					record.get("taxvaluedollarcnt"), record.get("landtaxvaluedollarcnt"), record.get("taxamount"), record.get("regionidcounty"), 
					record.get("regionidcity"));*/
			
			if(record.get(48).equals("")) {
				c48++;
				csvPrinter.printRecord(record.get(0), "fa4a980e-3e05-11e8-a64f-4a0005fac3b0", record.get(4), record.get(5), record.get(7), record.get(11), 
						Double.parseDouble(record.get(24)) / 1000000.0,	Double.parseDouble(record.get(25)) / 1000000.0, record.get(26), record.get(36), 
						"Los Angeles", record.get(39), record.get(47), "1", record.get(51), record.get(54));
			}
			else {
				csvPrinter.printRecord(record.get(0), "fa4a980e-3e05-11e8-a64f-4a0005fac3b0", record.get(4), record.get(5), record.get(7), record.get(11), 
						Double.parseDouble(record.get(24)) / 1000000.0,	Double.parseDouble(record.get(25)) / 1000000.0, record.get(26), record.get(36), 
						"Los Angeles", record.get(39), record.get(47), record.get(48), record.get(51), record.get(54));
			}
		}
		csvPrinter.flush();
		
		csvParser.close();
		csvPrinter.close();
		
		System.out.println("c48: " + c48);
		
		System.out.println("Total: " + total);
	}
}
