using System;
using System.IO;
using Microsoft.AspNetCore.Mvc;
using AdministradorDeAutos.Models;
using System.Net;
using Newtonsoft.Json;
using AdministradorDeAutos.Data;

namespace AdministradorDeAutos.Controllers
{
    public class HomeController : Controller
    {
        [HttpGet]
        public IActionResult Index()
        {
            var webClient = new WebClient();
            var json = webClient.DownloadString(Directory.GetCurrentDirectory() + @"\Data\database.json");
            var autos = JsonConvert.DeserializeObject<Context>(json);
            return View(autos);
        }
        [HttpPost]
        public JsonResult Store(int Id, String Marca, String Modelo, String Descrip, int Anio, int Km, decimal prec)
        {
            var webClient = new WebClient();
            var json = webClient.DownloadString(Directory.GetCurrentDirectory() + @"\Data\database.json");
            var autos = JsonConvert.DeserializeObject<Context>(json);
            int lastindex = autos.autos[autos.autos.Count - 1].Id;
            //GUARDA EL NUEVO AUTO
            Auto nvoauto = new Auto();
            nvoauto.Id = lastindex + 1;
            nvoauto.Marca = Marca;
            nvoauto.Modelo = Modelo;
            nvoauto.Descripcion = Descrip;
            nvoauto.Anio = Anio;
            nvoauto.Kilometros = Km;
            nvoauto.Precio = prec;
            //AÑADE A LA LISTA EL AUTO
            autos.autos.Add(nvoauto);
            //SE CREA UN NUEVO OBJETO PARA GUARDAR EN EL ARCHIVO
            var jsondata = new
            {
                autos = autos.autos
            };
            string jsonData = JsonConvert.SerializeObject(jsondata, Formatting.Indented);
            System.IO.File.WriteAllText(Directory.GetCurrentDirectory() + @"\Data\database.json", jsonData);
            return Json(nvoauto);
        }
        [HttpPut]
        public ContentResult Update(int Id, String Marca, String Modelo, String Descrip, int Anio, int Km, decimal prec)
        {
            var webClient = new WebClient();
            var json = webClient.DownloadString(Directory.GetCurrentDirectory() + @"\Data\database.json");
            var autos = JsonConvert.DeserializeObject<Context>(json);
            bool encontrado = false;
            foreach (var auto in autos.autos)
            {
                if(auto.Id == Id)
                {
                    auto.Marca = Marca;
                    auto.Modelo = Modelo;
                    auto.Descripcion = Descrip;
                    auto.Anio = Anio;
                    auto.Kilometros = Km;
                    auto.Precio = prec;
                    encontrado = true;
                    break;
                }
            }
            if (encontrado)
            {
                var jsondata = new
                {
                    autos = autos.autos
                };
                string jsonData = JsonConvert.SerializeObject(jsondata, Formatting.Indented);
                System.IO.File.WriteAllText(Directory.GetCurrentDirectory() + @"\Data\database.json", jsonData);
                return Content("S");
            }
            return Content("E");
        }
        [HttpDelete]
        public ContentResult Delete(int Id)
        {
            var webClient = new WebClient();
            var json = webClient.DownloadString(Directory.GetCurrentDirectory() + @"\Data\database.json");
            var autos = JsonConvert.DeserializeObject<Context>(json);
            bool removido = false;
            foreach (var auto in autos.autos)
            {
                if (auto.Id == Id)
                {
                    autos.autos.Remove(auto);
                    removido = true;
                    break;
                }
            }
            if (removido)
            {
                var jsondata = new
                {
                    autos = autos.autos
                };
                string jsonData = JsonConvert.SerializeObject(jsondata, Formatting.Indented);
                System.IO.File.WriteAllText(Directory.GetCurrentDirectory() + @"\Data\database.json", jsonData);
                return Content("S");
            }
            return Content("E");
        }
    }
}
