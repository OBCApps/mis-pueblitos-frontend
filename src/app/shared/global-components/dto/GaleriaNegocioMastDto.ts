export class GaleriaNegocioMast {
    id: string;
    entidad_tipo: string;
    entidad_id: string;
    url_imagen: string;
    es_principal: boolean;
    orden: number;
    tipo_servidor: string;
    servidor_bucket: string;
    nombre_generado: string;
    nombre_original: string;

    created_at: string;
    updated_at: string;
    usuario_creacion: string;
    usuario_modificacion: string | null;

}