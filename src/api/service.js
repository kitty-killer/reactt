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
  delete: function (id) {
    this.workers = this.workers.filter((worker) => worker.id !== id);
    return true;
  },
  add: function (worker) {
    this.workers.push(worker);
    return worker;
  },
  update: function (worker) {
    this.workers = this.workers.map(w => w.id === worker.id ? worker : w);
    return worker;
  },
};

export default WorkerAPI;
