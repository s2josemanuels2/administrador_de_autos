using AdministradorDeAutos.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AdministradorDeAutos.Data
{
    public class Context
    {
        public IList<Auto> autos { get; set; }
    }
}
