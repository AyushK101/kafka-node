## NOTE: Inside the same consumer group messages will load balance.


## Retention: TODO play with retention policy 


- cd /opt/kafka/bin

> Consumer
- ./kafka-console-consumer.sh --topic event --from-beginning --bootstrap-server localhost:9092

> Producer
- ./kafka-console-consumer.sh --topic event --from-beginning --bootstrap-server localhost:9092


---
## NOTE:
- `Consumer Group Offset`: offset till which one consumer group has consumed messages.
```markdown
If you run the script again, Kafka will not replay the message because:

The message at offset 0 was already consumed and committed.

Unless autoCommit: false is set or group ID is changed, it won't replay.
```


---
Kafka does not load-balance messages within a single partition across consumers.

Instead, it assigns whole partitions to consumers in a group.

This means:

One partition = One consumer in a group gets 100% of that partition’s messages
---
Kafka’s fundamental design guarantees message ordering within a partition.

If Kafka allowed multiple consumers to read from the same partition, it would break:

Ordering guarantees (which are critical in many use cases like financial systems)

Offset tracking (since offsets are per consumer group per partition)

---

# 📌 Even if you use RoundRobinAssignor, it balances partitions — not messages.


---
# Key:
- Sending key with message, make kafka compute one partition value for that key, eg: key=userId1 --> partition=0
