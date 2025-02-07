const express = require("express");
const projectData = require("./modules/projects");

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize the projects data before starting the server
projectData.initialize()
    .then(() => {
        console.log("Projects data initialized successfully.");

        // Route: GET "/"
        app.get("/", (req, res) => {
            res.send("Assignment 2: Ranjan Katuwal - 146586235"); // Replace with your name and student ID
        });

        // Route: GET "/solutions/projects"
        app.get("/solutions/projects", (req, res) => {
            projectData.getAllProjects()
                .then(projects => res.json(projects))
                .catch(error => res.status(500).send(error));
        });

        // Route: GET "/solutions/projects/id-demo"
        app.get("/solutions/projects/id-demo", (req, res) => {
            const projectId = 9; // Example project ID
            projectData.getProjectById(projectId)
                .then(project => res.json(project))
                .catch(error => res.status(404).send(error));
        });

        // Route: GET "/solutions/projects/sector-demo"
        app.get("/solutions/projects/sector-demo", (req, res) => {
            const sector = "agriculture"; // Example sector
            projectData.getProjectsBySector(sector)
                .then(projects => res.json(projects))
                .catch(error => res.status(404).send(error));
        });

        // Start the server
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch(error => {
        console.error("Failed to initialize projects data:", error);
    });