const { Node, Edge, Message, Model, Network, Entity, Neuron, ODRLModel, Neo4jStore } = require(".");

console.time("ready");

let n1 = new Node("n1");
let n2 = new Entity({ id: "n2", type: ["Entity"], msg: "n2 reached" });
let n3 = new Node("n3");
new Edge("e1", n1, n2);
new Edge(["e2"], n2, n3);
let m1 = new Message("m1");

let model = new Model("hello_world");
model.define(Entity);
model.define(Node);
let net = new Network(model);
// let n4 = net.add({ id: "n4", type: ["Entity"], msg: "n4 reached" });
let n4 = model.construct(["Entity"], { id: "n4", type: ["File", "Asset"] });
new Edge("e3", n2, n4);
new Edge("e4", n4, n3);
let e5 = new Edge({ type: "Relation", label: "e5" }, n3, model.construct("Node", { lorem: "ipsum" }));
// new Edge("e6", n4, e5.to);
new Edge("e6", e5.to, n4);

console.timeEnd("ready");

m1.process(n1);

