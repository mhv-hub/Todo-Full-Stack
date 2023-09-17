package com.mhv.todoApp.todo.controller;

import com.mhv.todoApp.todo.entity.Todo;
import com.mhv.todoApp.todo.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class MainController {

    @Autowired
    TodoService todoService;

    @GetMapping("/basic-auth")
    public String basicAuthentication(){
        return "success";
    }

    @GetMapping("/user/{username}/todos")
    public ResponseEntity<List<Todo>> getAllTodosForAUser(@PathVariable("username") String username){
        List<Todo> todos = todoService.findByUsername(username);
        return todos.size()>0 ? new ResponseEntity<>(todos, HttpStatusCode.valueOf(200)) : new ResponseEntity<>(new ArrayList<>(), HttpStatusCode.valueOf(200));
    }

    //@RolesAllowed({"ADMIN", "USER"})
    //@PostAuthorize("returnObject.getBody().username == #username")
    @GetMapping("/user/{username}/todo/{id}")
    @PreAuthorize("#username == authentication.name" )
    public ResponseEntity<Todo> getTodoForUsernameAndId(@PathVariable("username") String username, @PathVariable("id") int todoId){
        return todoService.findByUsernameAndId(todoId, username)
                .map((todo) -> new ResponseEntity<>(todo, HttpStatusCode.valueOf(200)))
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }

    @DeleteMapping("/user/{username}/todo/delete/{id}")
    public ResponseEntity<Void> deleteTodoByUsernameAndId(@PathVariable("username") String username, @PathVariable("id") int id){
        todoService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/user/{username}/todo/update/{id}")
    public ResponseEntity<Todo> updateTodoDetails(@PathVariable("username") String username, @PathVariable("id") int id, @RequestBody Todo todo){
        todoService.updateTodo(todo);
        return new ResponseEntity<>(todo, HttpStatusCode.valueOf(200));
    }

    @RequestMapping(value = "/user/{username}/todo/add", method = RequestMethod.POST)
    public ResponseEntity<Todo> addTodoDetails(@PathVariable("username") String username, @RequestBody Todo todo){
        Todo addedTodo = todoService.addTodo(username, todo.getDescription(), todo.getTargetDate(), todo.isDone());
        return new ResponseEntity<>(todo, HttpStatusCode.valueOf(200));
    }
}
