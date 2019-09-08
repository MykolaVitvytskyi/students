function createStudent(name, age){
  return {
    name : name,
    age : age,
    marks : []
  }
}

var students = [
  createStudent('Kolya', 20),
  createStudent('Julia', 25),
  createStudent('Andrew', 30)
];

function studentManagement(students){
  var group = students.slice(0);

  var manage = {

    addStudent : function(stud){
      group.push(stud);
    },

    getStudentName : function(name){
      return group.find(function(elem){
        return elem.name === name;
      });
    },

    removeStudent : function(name){
      var i = group.findIndex(function(elem){
        return elem.name === name;
      });

      if (i != -1){
        group.splice(i, 1);
      }
    },

      addMark : function(name, lessonNumber, mark ){
        var student = manage.getStudentName(name);

        if(student){
          student.marks[lessonNumber] = mark;
        }
      },

    getAverageMark : function(name){
      var student = manage.getStudentName(name);

      if (student){
        return student.marks.reduce(function(prev, next){
          return (prev + next);
        }, 0) / student.marks.length;
      }
    },

    getAverageLessonMark : function(lessonNumber){
      return group.reduce(function(prev, next){
        return (prev + next.marks[lessonNumber]);
      }, 0) / group.length;
  },

    sortStudentsByName : function(){
      return group.sort(function(a,b){
        return a.name > b.name ? 1 : -1;
      })
    },

    sortStudentsByMarks : function(){
      return group.sort(function(a,b){
        return manage.getAverageMark(a.name) < manage.getAverageMark(b.name) ? 1 : -1;
      })
    }
  };

  return manage;
}

var manage = studentManagement(students);

manage.addStudent(createStudent('Oleg', 18));
manage.removeStudent('Kolya');


manage.addMark('Julia', 0, 3);
manage.addMark('Julia', 1, 7);
manage.addMark('Andrew', 0, 10);
manage.addMark('Andrew', 1, 8);
manage.addMark('Oleg', 0, 7);
manage.addMark('Oleg', 1, 9);

console.log(manage.getAverageMark('Andrew'));
console.log(manage.getAverageLessonMark(1));

console.log(manage.sortStudentsByName());
console.log(manage.sortStudentsByMarks());