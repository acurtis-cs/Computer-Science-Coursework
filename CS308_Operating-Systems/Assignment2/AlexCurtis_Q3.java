import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;
import java.time.LocalDateTime;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;
import java.io.FileWriter;
import java.io.IOException;
import java.time.LocalDateTime;


public class AlexCurtis_Q3 {
    
    public static Thread thread1;
	public static Thread thread2;
    public static Thread thread3;

    public static Lock lock = new ReentrantLock();




    public static void output(String Name, double max, double min, double average) {

        lock.lock();

        try {

            FileWriter output = new FileWriter("Output.txt", true);

            output.write("Thread Name: " + Thread.currentThread().getName() + "\n");
            output.write("File Name: " + Name + "\n");
            output.write("The Maximum Salary: " + max + "\n");
            output.write("The Minimum Salary: " + min + "\n");
            output.write("The Average Salary: " + average + "\n");
            output.write("The task was concluded: " + LocalDateTime.now() + "\n");
            output.write("\n");

            output.close();

        } catch (IOException e) {

            System.out.println("Output function fail from " + Name);

        }

        lock.unlock();



    }








    public static void calculate(String Name) {

        double max = 0;
        double min = Double.MAX_VALUE;
        double average = 0;
        int count = 0;

        try {

            File file = new File(Name);
            Scanner input = new Scanner(file);

            // Skip the header line
            input.nextLine();

            while (input.hasNextLine()) {

                String line = input.nextLine();

                String[] data = line.split(",");

                //Make the string number into an actual number for java. 
                double salary = Double.parseDouble(data[3]);

                average += salary;
                count += 1;
                if (salary > max){
                    max = salary;
                }
                if (salary < min){
                    min = salary;
                }

            }
            input.close();

            average = average / count;

            output(Name, max, min, average);

            

        } catch (FileNotFoundException e) {

            System.out.println("Issue with thread " + Name);

        }

    }


    
    
    public static void main(String[] args) {





        thread1 = new Thread( 
					new Runnable() {
						public void run() {
							calculate("Input1.csv");
						}
					}
			);
			thread1.setName("Thread_1"); 
			
			
		thread2 = new Thread( 
					new Runnable() {
						public void run() {
							calculate("Input2.csv");
						}
					}
	    	);
		    thread2.setName("Thread_2");
        
        thread3 = new Thread( 
					new Runnable() {
						public void run() {
							calculate("Input3.csv");
						}
					}
	    	);
		    thread3.setName("Thread_3"); 
			

		thread1.start(); 
		thread2.start(); 
		thread3.start();


        try {
            thread1.join();
            thread2.join();
            thread3.join();
        }catch (InterruptedException e) {
            e.printStackTrace();
        }

        try {

            FileWriter output = new FileWriter("Output.txt", true);

            output.write("This summary was completed using three parallel threads."+ "\n");
            output.write("This work was done by: Alex Curtis ID#000742889" + "\n");

            output.close();

        } catch (IOException e) {

            System.out.println("Issue writing to output file");

        }




    }



}
