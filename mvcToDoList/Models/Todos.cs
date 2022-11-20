using Microsoft.IdentityModel;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace mvcToDoList.Models
{
    public class Todos
    {
        public int ID { get; set; }
        
        public string Name { get; set; }
        public string Category { get; set; }
        public string Estimate { get; set; }
        public DateTime DueDate { get; set; }
        public string Importance { get; set; }
        public string Status { get; set; }
    }

    public class TodosDBContext : DbContext
    {
        public DbSet<Todos> Todo { get; set; }
    }
}