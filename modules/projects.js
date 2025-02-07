// projects.js

const projectData = require("../data/projectData.json");
const sectorData = require("../data/sectorData.json");

let projects = [];

function initialize() {
    return new Promise((resolve, reject) => {
        try {
            projects = projectData.map(project => {
                const sector = sectorData.find(sector => sector.id === project.sector_id);
                return {
                    ...project,
                    sector: sector ? sector.sector_name : "Unknown Sector"
                };
            });
            resolve();
        } catch (error) {
            reject("Unable to initialize projects data.");
        }
    });
}

function getAllProjects() {
    return new Promise((resolve, reject) => {
        if (projects.length > 0) {
            resolve(projects);
        } else {
            reject("No projects found.");
        }
    });
}

function getProjectById(projectId) {
    return new Promise((resolve, reject) => {
        const project = projects.find(project => project.id === projectId);
        if (project) {
            resolve(project);
        } else {
            reject("Unable to find the requested project.");
        }
    });
}

function getProjectsBySector(sector) {
    return new Promise((resolve, reject) => {
        const filteredProjects = projects.filter(project =>
            project.sector.toLowerCase().includes(sector.toLowerCase())
        );
        if (filteredProjects.length > 0) {
            resolve(filteredProjects);
        } else {
            reject("No projects found for the specified sector.");
        }
    });
}

// Export the functions
module.exports = {
    initialize,
    getAllProjects,
    getProjectById,
    getProjectsBySector
};

// Function to get projects by sector
function getProjectsBySector(sector) {
    return new Promise((resolve, reject) => {
        const filteredProjects = projects.filter(project =>
            project.sector.toLowerCase().includes(sector.toLowerCase())
        );
        if (filteredProjects.length > 0) {
            resolve(filteredProjects);
        } else {
            reject("No projects found for the specified sector.");
        }
    });
}

// Test block (remove this after testing)
initialize()
    .then(() => {
        console.log("Initialization successful!");
        return getAllProjects();
    })
    .then(projects => {
        console.log("All Projects:", projects);
        return getProjectById(9); // Replace with a valid project ID
    })
    .then(project => {
        console.log("Project by ID:", project);
        return getProjectsBySector("agriculture"); // Replace with a valid sector
    })
    .then(projects => {
        console.log("Projects by Sector:", projects);
    })
    .catch(error => {
        console.error("Error:", error);
    });