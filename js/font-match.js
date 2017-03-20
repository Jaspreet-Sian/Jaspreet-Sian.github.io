// 
// var net = new brain.NeuralNetwork();
// net.train([{input : [0], output : [0.7]},
// {input : 0.1, output : [0.6]},
// {input : 0.2, output : [0.4]},
// {input : 0.3, output : [0.3]},
// {input : 0.4, output : [0.2]},
// {input : 0.5, output : [0.2]},
// {input : 0.6, output : [0.1]},
// {input : 0.7, output : [0]}],{
//   errorThresh : 0.5,
//   iterations : 20000,
//   log : true,
//   logPeriod : 100,
//   learningRate : 0.3
// });
// //create a simple recurrent neural network
// var net = new brain.NeuralNetwork();
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
// sample();
//
// // function runNetwork(){
// //   console.log(bitZeroArr.length,"chkda");
// //   for(let i=0; i < bitZeroArr.length; i++ ){
// //     var output= net.run(0.6);
// //     console.log(output,"output");
// //   }
// // }
