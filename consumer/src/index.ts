import { Kafka } from "kafkajs";
import fs from 'fs';

const kafka = new Kafka({
    clientId: 'event-app',
    brokers: ["localhost:9092"],
})


const producer = kafka.producer();
const consumer = kafka.consumer({
    groupId: 'gp-2'
});


if(!fs.existsSync("./logs"))
fs.mkdir("./logs", (err) => {
    if (err) console.log(err)
});

async function main() {
    await producer.connect();

    await producer.send({
        topic: 'event',
        messages: [{ value: 'monday:purchaseEvent' }
        ]
    })

    await consumer.connect();
    await consumer.subscribe({ topic: 'event', fromBeginning: true })

    await consumer.run({
        // autoCommit: false,
        eachMessage: async ({ heartbeat, message, partition, pause, topic }) => {
            console.log({ message, partition, topic })

            const value = message.value?.toString();
            console.log(value);

            // fs.appendFile('./logs/temp.log', (value || ''), { encoding: 'utf-8' }, (err) => {
            //     if (err) console.log(err)
            // })

        }
    })

}

main()