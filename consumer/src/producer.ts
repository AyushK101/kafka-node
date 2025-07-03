import { Kafka } from "kafkajs";


const kafka = new Kafka({
    brokers: ["localhost:9092"],
    clientId: "event-app"
})

const producer = kafka.producer();

await producer.connect()

await producer.send({
    topic: "payment",
    messages: [
        {value: JSON.stringify({
            userId: 1,
            courseId: 23,
            success: true
        }), partition: 2}
    ]
})

