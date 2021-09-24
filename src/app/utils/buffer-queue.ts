export class BufferQueue<T> {
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

  public enqueue(item: T): void {
    this.buffer.push(item);

    if (this.buffer.length === this.size) {
      this.flush();
    } else if (!this.timer) {
      this.timer = setTimeout(this.flush.bind(this), this.timeout);
    }
  }

  public async flush(): Promise<void> {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }

    const size = this.buffer.length;

    if (size) {
      await this.fn(this.buffer.splice(0, size));
    }
  }
}
