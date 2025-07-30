const quizData = {
    "units-measurement-basic": {
        title: "Units & Measurement - Basics",
        description: "Vector/Scalar quantities, Displacement, Distance",
        questions: [
            {
                question: "Which of the following is a vector quantity?",
                options: ["Mass", "Time", "Displacement", "Temperature"],
                correct: 2,
                explanation: "Displacement requires both magnitude and direction, making it a vector quantity."
            },
            {
                question: "What is the difference between distance and displacement?",
                options: [
                    "Distance is vector, displacement is scalar",
                    "Distance is scalar, displacement is vector", 
                    "Both are vectors",
                    "Both are scalars"
                ],
                correct: 1,
                explanation: "Distance only requires magnitude (scalar), while displacement requires both magnitude and direction (vector)."
            },
            {
                question: "A person walks 5 km east, then 5 km west. What is the displacement?",
                options: ["10 km", "0 km", "5 km east", "5 km west"],
                correct: 1,
                explanation: "Displacement is the shortest distance between initial and final positions. Since the person returns to the starting point, displacement = 0."
            },
            {
                question: "Which of the following is NOT a scalar quantity?",
                options: ["Speed", "Mass", "Velocity", "Time"],
                correct: 2,
                explanation: "Velocity requires direction along with magnitude, making it a vector quantity."
            },
            {
                question: "If velocity = displacement/time, then speed = ?",
                options: ["displacement/time", "distance/time", "time/distance", "distance × time"],
                correct: 1,
                explanation: "Speed is the ratio of total distance traveled to total time taken."
            }
        ]
    },
    
    "significant-figures": {
        title: "Significant Figures",
        description: "Rules and calculations with significant figures",
        questions: [
            {
                question: "How many significant figures are in 7250?",
                options: ["2", "3", "4", "5"],
                correct: 1,
                explanation: "Without decimal point, count from right to left starting from first non-zero digit: 7250 has 3 significant figures."
            },
            {
                question: "How many significant figures are in 0.0123?",
                options: ["2", "3", "4", "5"],
                correct: 1,
                explanation: "With decimal point, count from left to right starting from first non-zero digit: 0.0123 has 3 significant figures."
            },
            {
                question: "What is 1.2 × 1.234 with correct significant figures?",
                options: ["1.4808", "1.48", "1.5", "1.481"],
                correct: 2,
                explanation: "The result should have 2 significant figures (minimum from the given numbers): 1.2 × 1.234 = 1.5"
            },
            {
                question: "How many significant figures are in 8.0000?",
                options: ["1", "2", "4", "5"],
                correct: 3,
                explanation: "All zeros after the decimal point are significant: 8.0000 has 5 significant figures."
            },
            {
                question: "What is 12.56 ÷ 3.2 with correct significant figures?",
                options: ["3.925", "3.93", "3.9", "4.0"],
                correct: 2,
                explanation: "Result should have 2 significant figures (minimum): 12.56 ÷ 3.2 = 3.9"
            }
        ]
    },

    "vernier-caliper": {
        title: "Vernier Caliper",
        description: "Least count, measurements, and calculations",
        questions: [
            {
                question: "If main scale division = 1mm and vernier scale has 10 divisions, what is the least count?",
                options: ["0.01 mm", "0.1 mm", "1 mm", "0.001 mm"],
                correct: 1,
                explanation: "Least count = Smallest division on main scale / Number of divisions on vernier scale = 1/10 = 0.1 mm"
            },
            {
                question: "If LC = 0.02 mm and main scale reading = 2.5 cm, 6th vernier division coincides, what is total reading?",
                options: ["2.56 cm", "2.52 cm", "2.512 cm", "2.62 cm"],
                correct: 2,
                explanation: "Total reading = MSR + (N.D × LC) = 2.5 + (6 × 0.02) = 2.5 + 0.12 = 2.52 cm"
            },
            {
                question: "To get LC = 0.02 mm with 1 mm main scale divisions, how many vernier divisions needed?",
                options: ["10", "20", "25", "50"],
                correct: 3,
                explanation: "LC = MSD/VSD, so VSD = MSD/LC = 1/0.02 = 50 divisions"
            },
            {
                question: "If 10 VSD = 9 MSD and 1 MSD = 1 mm, what is the least count?",
                options: ["0.01 mm", "0.1 mm", "1 mm", "0.001 mm"],
                correct: 1,
                explanation: "1 VSD = 9/10 = 0.9 mm, LC = 1 MSD - 1 VSD = 1 - 0.9 = 0.1 mm"
            },
            {
                question: "For high accuracy measurements, the least count should be:",
                options: ["Large", "Small", "Equal to 1", "Random"],
                correct: 1,
                explanation: "Smaller least count means higher precision and accuracy in measurements."
            }
        ]
    },

    "micrometer": {
        title: "Micrometer Screw Gauge",
        description: "Pitch, least count, and measurements",
        questions: [
            {
                question: "If pitch = 1 mm and circular scale has 100 divisions, what is LC?",
                options: ["0.01 mm", "0.1 mm", "0.001 mm", "1 mm"],
                correct: 0,
                explanation: "LC = Pitch / Number of divisions on circular scale = 1/100 = 0.01 mm"
            },
            {
                question: "What does the pitch of a micrometer represent?",
                options: [
                    "Distance moved in 10 rotations",
                    "Distance moved in one rotation",
                    "Number of main scale divisions",
                    "Number of circular scale divisions"
                ],
                correct: 1,
                explanation: "Pitch is the distance moved by the screw in one complete rotation."
            },
            {
                question: "MSR = 3.0 mm, 45th circular division coincides, LC = 0.01 mm. Total reading?",
                options: ["3.45 mm", "4.35 mm", "3.005 mm", "3.54 mm"],
                correct: 0,
                explanation: "Total reading = MSR + (circular reading × LC) = 3.0 + (45 × 0.01) = 3.45 mm"
            },
            {
                question: "If circular scale divisions are doubled keeping pitch same, LC will be:",
                options: ["Doubled", "Halved", "Same", "Zero"],
                correct: 1,
                explanation: "LC = Pitch/Divisions. If divisions double, LC becomes half."
            },
            {
                question: "A micrometer with pitch 0.5 mm and 50 circular divisions has LC:",
                options: ["0.01 mm", "0.02 mm", "0.005 mm", "0.1 mm"],
                correct: 0,
                explanation: "LC = 0.5/50 = 0.01 mm"
            }
        ]
    },

    "errors-analysis": {
        title: "Error Analysis",
        description: "Types of errors, percentage errors, calculations",
        questions: [
            {
                question: "If measurement = 5 ± 0.1 cm, what is the percentage error?",
                options: ["1%", "2%", "5%", "20%"],
                correct: 1,
                explanation: "Percentage error = (Error/Measurement) × 100 = (0.1/5) × 100 = 2%"
            },
            {
                question: "L₁ = 6 ± 0.1 cm, L₂ = 7 ± 0.5 cm. Error in (L₁ + L₂) is:",
                options: ["± 0.4 cm", "± 0.6 cm", "± 0.1 cm", "± 0.5 cm"],
                correct: 1,
                explanation: "In addition/subtraction, errors are added: Error = 0.1 + 0.5 = 0.6 cm"
            },
            {
                question: "For L₁ + L₂ = 13 ± 0.6 cm, the percentage error is:",
                options: ["4.61%", "6%", "13%", "0.6%"],
                correct: 0,
                explanation: "Percentage error = (0.6/13) × 100 = 4.61%"
            },
            {
                question: "In vernier calipers, if 0th vernier division is right of 0th main scale division:",
                options: ["No error", "Positive error", "Negative error", "Random error"],
                correct: 1,
                explanation: "When 0th vernier division is to the right, it indicates positive zero error."
            },
            {
                question: "L₂ - L₁ = 1 ± 0.6 cm gives percentage error of:",
                options: ["60%", "6%", "1%", "0.6%"],
                correct: 0,
                explanation: "Percentage error = (0.6/1) × 100 = 60%"
            }
        ]
    }
};
