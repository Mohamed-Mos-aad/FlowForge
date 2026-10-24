export default function NodeForm() {
    return (
        <div>
            <form>
                <div>
                    <input type="text" name="" id="" defaultValue="Enrich Customer" />
                    <textarea name="" id="" cols={30} rows={1} defaultValue="Looks up company and role data."></textarea>
                    <div>
                        <span></span>
                        Success · 412ms
                    </div>
                </div>
                <div>
                    <h1>Request</h1>
                    <div>
                        <button>GET</button>
                        <button>POST</button>
                        <button>PUT</button>
                        <button>DELETE</button>
                    </div>
                    <div>
                        <label htmlFor="url">URL</label>
                        <input type="text" name="url" id="url" />
                    </div>
                    <div>
                        <label htmlFor="authentication">Authentication</label>
                        <input type="text" name="authentication" id="authentication" />
                    </div>
                </div>
                <div>
                    <h2>Headers · 2</h2>
                    <div>
                        <input type="text" name="url" id="url" />
                        <input type="text" name="url" id="url" />
                    </div>
                    <div>
                        <div>
                            <label htmlFor="timeout">Timeout</label>
                            <input type="text" name="timeout" id="timeout" />
                        </div>
                        <div>
                            <label htmlFor="retries">Retries</label>
                            <input type="text" name="retries" id="retries" />
                        </div>
                    </div>
                    <p>Timeout is below p95 latency (412 ms avg). Use at least 1000 ms.</p>
                </div>
                <button>Test request</button>
            </form>
        </div>
    );
}