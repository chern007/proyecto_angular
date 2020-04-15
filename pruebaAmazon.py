#['mora','aroma', 'salero']
#'amor'



def funcname(palabrasList, patron):

    result = []
    
    patronLongitud = len(patron)

    print("Longitud Patron: " + str(patronLongitud))

    # recorremos cada palabra de la lista
    for palabra in palabrasList:
        
        coincidenciasPalabra = 0

        for letraPalabra in palabra:

            posicionLetrasPatronUsadas = []
            for l in range(len(patron)):

                letraPatron = patron[l]

                if letraPatron == letraPalabra and (l not in posicionLetrasPatronUsadas):
                    coincidenciasPalabra = coincidenciasPalabra + 1
                    posicionLetrasPatronUsadas.append(l)
        print("Coincidencias patron-palabra: " + str(coincidenciasPalabra))

        if coincidenciasPalabra==patronLongitud:
            print(palabra)



if __name__ == "__main__":
    funcname(['mora','aroma', 'salero', 'maro'], 'amor')