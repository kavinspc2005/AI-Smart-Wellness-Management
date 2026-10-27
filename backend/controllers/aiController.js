const getRecommendation = async (req, res) => {

    const {
        healthGoal,
        foodPreference,
        activityLevel
    } = req.body;


    let diet;
    let workout;
    let tip;


    // Weight Loss
    if (healthGoal === "Weight Loss") {

        diet =
            "Choose vegetables, fruits, whole grains and protein-rich foods. Reduce sugary and processed foods.";

        workout =
            "Start with 30 minutes of walking and light strength exercises.";

        tip =
            "Drink enough water and maintain a regular sleep schedule.";

    }


    // Weight Gain
    else if (healthGoal === "Weight Gain") {

        diet =
            "Include nutritious calorie-rich foods such as nuts, milk, bananas and whole grains.";

        workout =
            "Do light to moderate strength training regularly.";

        tip =
            "Eat regular balanced meals and get enough sleep.";

    }


    // Muscle Gain
    else if (healthGoal === "Muscle Gain") {

        diet =
            "Include protein-rich foods such as eggs, dal, paneer, tofu, chicken or fish.";

        workout =
            "Focus on regular strength training exercises.";

        tip =
            "Give your body enough rest and maintain good hydration.";

    }


    // Healthy Lifestyle
    else {

        diet =
            "Maintain a balanced diet with vegetables, fruits, protein and whole grains.";

        workout =
            "Walk regularly and include stretching or light exercise.";

        tip =
            "Stay hydrated and maintain a consistent sleep routine.";

    }


    res.json({

        diet: diet,

        workout: workout,

        tip: tip,

        foodPreference: foodPreference,

        activityLevel: activityLevel

    });

};


module.exports = {
    getRecommendation
};