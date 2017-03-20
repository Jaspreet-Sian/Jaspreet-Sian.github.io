//create a simple recurrent neural network
// var net = new brain.recurrent.RNN();
//
// net.train([{input: [0, 0], output: [0]},
//            {input: [0, 1], output: [1]},
//            {input: [1, 0], output: [1]},
//            {input: [1, 1], output: [0]}],{
//              errorThresh: 0.5,
//              iterations : 20000,
//              log: true,
//              logPeriod: 100,
//              learningRate: 0.3
//            });
//
// function sample(){
// var output = net.run([0.5, 0.7]);  // [0]
// var output2 = net.run([0, 1]);  // [1]
// var output3 = net.run([1, 0]);  // [1]
// var output4 = net.run([1, 1]);  // [0]
// console.log(output,"1TN");
// console.log(output2,"2TN");
// console.log(output3,"3TN");
// console.log(output4,"4TN");
// }
