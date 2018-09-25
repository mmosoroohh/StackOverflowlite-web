const path = require("path");

module.exports = {
    mode: "development",
    entry: {
        signup: "./src/js/signup.js",
        signin: "./src/js/signin.js",
        post_question: "./src/js/post_question.js",
        get_questions: "./src/js/get_questions.js",
        single_question: "./src/js/singleQuestion.js",
        answer:"./src/js/answer.js",
        search:"./src/js/search.js"
    },
    output: {
        path: path.resolve(__dirname, "src/public/dist"),
        filename: "[name].bundle.js"
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules)/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: ["babel-preset-env"]
                }
            }
        }]
    },
    devtool: "inline-source-map"
}