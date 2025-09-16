import Contact from "../model/Contact.js";
import Partnership from "../model/Partnership.js";
import Sponsorship from "../model/Sponsorship.js";
import Volunteer from "../model/Volunteer.js";
import Project from "../model/Project.js";
import Program from "../model/Program.js";
import Media from "../model/Media.js";
import FeaturedEvent from "../model/FeaturedEvent.js";

// Get comprehensive dashboard statistics
export const getDashboardStats = async(req, res) => {
    try {
        // Fetch all counts in parallel
        const [
            partnershipsCount,
            sponsorshipsCount,
            volunteersCount,
            contactsCount,
            projectsCount,
            programsCount,
            mediaCount,
            eventsCount,
        ] = await Promise.all([
            Partnership.countDocuments(),
            Sponsorship.countDocuments(),
            Volunteer.countDocuments(),
            Contact.countDocuments(),
            Project.countDocuments(),
            Program.countDocuments(),
            Media.countDocuments(),
            FeaturedEvent.countDocuments(),
        ]);

        // Calculate additional metrics
        const totalEngagement =
            partnershipsCount + sponsorshipsCount + volunteersCount;
        const contentItems =
            projectsCount + programsCount + mediaCount + eventsCount;

        // Simulated data for demonstration (replace with real data sources)
        const donations = Math.floor(Math.random() * 100000) + 50000;
        const beneficiaries = Math.floor(Math.random() * 10000) + 5000;

        // Get recent activities
        const recentContacts = await Contact.find()
            .sort({ createdAt: -1 })
            .limit(3)
            .select("firstName lastName subject createdAt");

        const recentVolunteers = await Volunteer.find()
            .sort({ createdAt: -1 })
            .limit(2)
            .select("firstName lastName createdAt");

        // Generate monthly data for the last 6 months
        const monthlyData = [];
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

        for (let i = 0; i < 6; i++) {
            monthlyData.push({
                month: months[i],
                donations: Math.floor(Math.random() * 50000) + 20000,
                volunteers: Math.floor(Math.random() * 100) + 50,
                projects: Math.floor(Math.random() * 10) + 5,
                beneficiaries: Math.floor(Math.random() * 1000) + 500,
            });
        }

        // Generate recent activities
        const recentActivities = [{
                type: "donation",
                message: "New donation received",
                amount: `$${Math.floor(Math.random() * 1000) + 100}`,
                time: "2 minutes ago",
                icon: "💰",
            },
            ...recentVolunteers.map((volunteer) => ({
                type: "volunteer",
                message: "New volunteer registered",
                name: `${volunteer.firstName} ${volunteer.lastName}`,
                time: getTimeAgo(volunteer.createdAt),
                icon: "🤝",
            })),
            {
                type: "project",
                message: "Project milestone completed",
                project: "Clean Water Initiative",
                time: "1 hour ago",
                icon: "🎯",
            },
            ...recentContacts.map((contact) => ({
                type: "contact",
                message: "New inquiry received",
                subject: contact.subject,
                time: getTimeAgo(contact.createdAt),
                icon: "✉️",
            })),
            {
                type: "event",
                message: "Event registration opened",
                event: "Ramadan Food Drive",
                time: "3 hours ago",
                icon: "🌟",
            },
        ].slice(0, 8); // Limit to 8 activities

        const stats = {
            partnerships: partnershipsCount,
            sponsorships: sponsorshipsCount,
            volunteers: volunteersCount,
            contacts: contactsCount,
            projects: projectsCount,
            programs: programsCount,
            media: mediaCount,
            events: eventsCount,
            donations,
            beneficiaries,
            totalEngagement,
            contentItems,
            monthlyData,
            recentActivities,
            trends: {
                donations: { value: 12, direction: "up" },
                volunteers: { value: 15, direction: "up" },
                projects: { value: 5, direction: "up" },
                beneficiaries: { value: 8, direction: "up" },
            },
        };

        res.status(200).json({
            success: true,
            message: "Dashboard statistics retrieved successfully",
            data: stats,
        });
    } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch dashboard statistics",
            error: error.message,
        });
    }
};

// Get real-time metrics
export const getRealTimeMetrics = async(req, res) => {
    try {
        // Simulate real-time data
        const metrics = {
            activeUsers: Math.floor(Math.random() * 50) + 10,
            ongoingCampaigns: Math.floor(Math.random() * 5) + 2,
            todayDonations: Math.floor(Math.random() * 5000) + 1000,
            newVolunteers: Math.floor(Math.random() * 10) + 1,
            timestamp: new Date().toISOString(),
        };

        res.status(200).json({
            success: true,
            data: metrics,
        });
    } catch (error) {
        console.error("Error fetching real-time metrics:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch real-time metrics",
            error: error.message,
        });
    }
};

// Get monthly trends
export const getMonthlyTrends = async(req, res) => {
    try {
        const { year = new Date().getFullYear() } = req.query;

        // Generate trend data for each month
        const trends = [];
        const monthNames = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];

        for (let month = 0; month < 12; month++) {
            const startDate = new Date(year, month, 1);
            const endDate = new Date(year, month + 1, 0);

            // Get actual data for the month
            const [monthlyContacts, monthlyVolunteers] = await Promise.all([
                Contact.countDocuments({
                    createdAt: { $gte: startDate, $lte: endDate },
                }),
                Volunteer.countDocuments({
                    createdAt: { $gte: startDate, $lte: endDate },
                }),
            ]);

            trends.push({
                month: monthNames[month],
                monthNumber: month + 1,
                contacts: monthlyContacts,
                volunteers: monthlyVolunteers,
                donations: Math.floor(Math.random() * 50000) + 20000,
                projects: Math.floor(Math.random() * 10) + 3,
                beneficiaries: Math.floor(Math.random() * 1000) + 500,
            });
        }

        res.status(200).json({
            success: true,
            data: trends,
        });
    } catch (error) {
        console.error("Error fetching monthly trends:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch monthly trends",
            error: error.message,
        });
    }
};

// Helper function to calculate time ago
const getTimeAgo = (date) => {
    const now = new Date();
    const diffInMs = now - new Date(date);
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMinutes < 60) {
        return `${diffInMinutes} minute${diffInMinutes !== 1 ? "s" : ""} ago`;
    } else if (diffInHours < 24) {
        return `${diffInHours} hour${diffInHours !== 1 ? "s" : ""} ago`;
    } else {
        return `${diffInDays} day${diffInDays !== 1 ? "s" : ""} ago`;
    }
};