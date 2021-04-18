export class BuffereredQueue<T> {
  private readonly fn: (items: T[]) => Promise<void>;
  private readonly timeout: number;
  private readonly size?: number;

  private readonly buffer: T[];
  private timer: NodeJS.Timeout | null;

  constructor(
    fn: (items: T[]) => Promise<void>,
    timeout: number,
    size?: number,
  ) {
    this.fn = fn;
    this.timeout = timeout;
    this.size = size;

    this.buffer = [];
    this.timer = null;
  }

  public enqueue(item: T) {
    this.buffer.push(item);

    if (this.buffer.length === this.size) {
      this.flush();
    } else if (!this.timer) {
      this.timer = setTimeout(this.flush.bind(this), this.timeout);
    }
  }

  public async flush() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }

    const items = this.buffer.splice(0, this.buffer.length);

    await this.fn(items);
  }
}
