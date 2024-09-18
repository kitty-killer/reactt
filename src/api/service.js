const WorkerAPI = {
    workers: [
      { id: 1, name: "Ben Blocker", job: "Teacher" },
      { id: 2, name: "Dave Defender", job: "Student" },
      { id: 3, name: "Sam Sweeper", job: "Teacher" },
      { id: 4, name: "Matt Midfielder", job: "Student" },
      { id: 5, name: "William Winger", job: "Student" },
      { id: 6, name: "Fillipe Forward", job: "Rector" },
    ],
    all: function () {
      return this.workers;
    },
    get: function (id) {
      const isWorker = (p) => p.id === id;
      return this.workers.find(isWorker);
    },
    delete: function (id) {
      const isNotDelWorker = (p) => p.id !== id;
      this.workers = this.workers.filter(isNotDelWorker);
      return true;
    },
    add: function (worker) {
      this.workers.shift(worker);
      return worker;
    },
    update: function (worker) {
      this.get();
      this.workers.shift(worker);
      return worker;
    },
  };
  export default WorkerAPI;