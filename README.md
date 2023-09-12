# LeetStudy

#### A LeetCode Study CRUD app written in JS


<a name="readme-top"></a>

<!-- LeetCode Gif -->
![leet](https://github.com/UreshiiPanda/LeetStudy/assets/39992411/ec14792d-96d8-433c-ba4b-e35accb09f9d)


<!-- ABOUT THE PROJECT -->
## About The Project
The purpose of this webapp is to present LeetCode patterns in a way that is minimalistic and simple. 
This app is designed as a small flashcard-like studying app to help LeetCode learners memorize LeetCode 
topics which they can then apply to LeetCode problems. The emphasis here is on the patterns instead of 
the LeetCode problems themselves. Relevant LeetCode problems have been listed with each pattern for those 
who wish to apply these patterns outside of this site. This app is a full CRUD app where users can read, 
create, edit, and delete LeetCode study entries.

<h4>Tech Stack:</h4>  Javascript ~ React ~ MongoDB ~ Express ~ Node ~ HTML ~ CSS ~ Material UI <br><br>


<p align="right">(<a href="#readme-top">back to top</a>)</p>




<!-- GETTING STARTED WITH DOCKER -->
## Getting Started With Docker:<br>

0. If you already have Docker installed on your machine, then this app can be simply run with the
   following instructions. The docker-compose.yml contains all of the Docker info needed
   to understand the context in which the app runs, including: builds, ports, network, volume
   storage, and environment variables. Note that for simplicity, the environment variables for
   the backend express server have been placed directly into the .yml file, but these can also be
   moved to a separate .env file and more can be read about how to do that here:
   [Docker Env Vars](https://docs.docker.com/compose/environment-variables/set-environment-variables/)

1. Clone all project files into a root working directory.
    ```sh
        git clone https://github.com/UreshiiPanda/LeetStudy.git
    ```
2. From that root directory, run docker compose:
    ```sh
        docker compose up
    ```
3. To stop the app, stop docker compose from another terminal:
    ```sh
        docker compose down
    ```



<!-- GETTING STARTED WITHOUT DOCKER -->
## Getting Started Without Docker:<br>

1. Clone all project files into a root working directory.
    ```sh
        git clone https://github.com/UreshiiPanda/LeetStudy.git
    ```
    
2. Setup your MongoDB database, create a new cluster, and host it or connect your local IP to it. Retrieve
   your MongoDB connection string from here. The connection string will look something like this,
   depending on your means of connecting:
   ```
     mongodb+srv://<username>:<password>@cluster0.vj6fual.mongodb.net/?retryWrites=true&w=majority
   ```

3. Store environment variables by creating ```/backend/.env``` in the backend directory.<br>
   Place your environment variables into this file. Replace &lt;username&gt; and &lt;password&gt; in the
   MongoDB connect string with your MongoDB credentials. <br>
      ```
        PORT=8000
        mongo_db_uri=mongodb+srv://<username>:<password>@cluster0.vj6fual.mongodb.net/?retryWrites=true&w=majority
      ```

      NOTE:  The package.json on the frontend has a proxy setup by default, please adjust this
             according to your own connection needs. The proxy is currently setup to connect to a Docker
             Container, so please change the proxy to the localhost proxy shown below in order to use it
             without Docker. Default ports are set to 8000 for the backend, and 3000 for the frontend. <br>
      ```json
          "proxy": "http://localhost:8000"
      ```

5. Run the following command in both the frontend and the backend directories to install the
   node modules required for both ends of the app.
   ```sh
      npm install
   ```
   
6. Check that your MongoDB cluster is connected and then start the backend of the app from the
   backend directory:
    ```sh
      node controller.mjs
    ```
    
8. Start the frontend of the app from the frontend directory:
    ```sh
      npm start
    ```


<p align="right">(<a href="#readme-top">back to top</a>)</p>
