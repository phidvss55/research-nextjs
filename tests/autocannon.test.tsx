import autocannon from "autocannon";

describe("Load test /ping/100", () => {
  it("should sustain only 80 connections at a time", async () => {
    const result = await autocannon({
      url: "http://localhost:8002/ping/80",
      method: "GET",
      duration: 1, // seconds
      connections: 80, // approximate equivalent to Vegeta -rate=110
      pipelining: 1,
    });

    console.log("Requests:", result.requests.total);
    console.log("Latency (avg):", result.latency.average, "ms");
    console.log("Latency (p95):", result.latency.p90, "ms");
    console.log("Latency (p99):", result.latency.p99, "ms");
    console.log("Success:", result.non2xx);

    expect(result["2xx"]).toBe(80);
  });

  it("should sustain only 50 connections at a time", async () => {
    const result = await autocannon({
      url: "http://localhost:8002/ping/50",
      method: "GET",
      duration: 1, // seconds
      connections: 50, // approximate equivalent to Vegeta -rate=110
      pipelining: 1,
    });

    console.log("Requests:", result.requests.total);
    console.log("Latency (avg):", result.latency.average, "ms");
    console.log("Latency (p95):", result.latency.p90, "ms");
    console.log("Latency (p99):", result.latency.p99, "ms");
    console.log("Success:", result.non2xx);

    // simple assertion
    expect(result["2xx"]).toBe(50);
  });

  it("should sustain only 50 connections at a time", async () => {
    const result = await autocannon({
      url: "http://localhost:8002/ping/100",
      method: "GET",
      duration: 1, // seconds
      connections: 100, // approximate equivalent to Vegeta -rate=110
      pipelining: 1,
    });

    console.log("Requests:", result.requests.total);
    console.log("Latency (avg):", result.latency.average, "ms");
    console.log("Latency (p95):", result.latency.p90, "ms");
    console.log("Latency (p99):", result.latency.p99, "ms");
    console.log("Success:", result.non2xx);

    // simple assertion
    expect(result["2xx"]).toBe(100);
  });
});
