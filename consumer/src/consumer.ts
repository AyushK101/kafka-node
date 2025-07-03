import { Kafka } from "kafkajs";


const kafka = new Kafka({
    brokers: ["localhost:9092"],
    clientId: "event-app"
})


const consumer = kafka.consumer({
    groupId: 'email-sending-group'
})

await consumer.connect();
await consumer.subscribe({topic: 'payment',fromBeginning: true});

consumer.run({
    eachMessage: async ({message, topic, partition}) =>{
        console.log({message, topic, partition})
        const value = message.value?.toString();
        const v1: Buffer<ArrayBufferLike> = message.value || new Buffer('');

        console.log(value);
    }
})